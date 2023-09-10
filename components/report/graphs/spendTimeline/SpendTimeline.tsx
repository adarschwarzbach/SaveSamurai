

type TooltipData = {
    date: string;
    totalSpend: number;
    decreasedSpend: number;
  } | null;
  
  type TooltipState = {
    show: boolean;
    x: number;
    y: number;
    data: TooltipData;
  };
  

import React, { useMemo, useState } from "react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { useGlobalState } from "../../../../contexts/GlobalState";
const width = 650;
const height = 320;
const margin = { top: 40, right: 40, bottom: 50, left: 60 };
const tooltipWidth = 120;

const titleDx = width / 2 ;
const titleDy = margin.top / 1 + 0;
const xLabelDx = width / 2;
const xLabelDy = height - 10;
const yLabelDx = 80;
const yLabelDy = margin.top / 2 + 8;

export default function SpendTimeline() {
	const [tooltip, setTooltip] = useState<TooltipState>({ show: false, x: 0, y: 0, data: null });
	const { darkMode, report } = useGlobalState();
	const data = report?.graphs?.xy ?? [];

	const accumulatedData = useMemo(() => {
		let totalSpendAccumulated = 0;
		let decreasedSpendAccumulated = 0;
		return data.map(d => {
			totalSpendAccumulated += d.totalSpend;
			decreasedSpendAccumulated += d.decreasedSpend;
			return {
				date: d.date,
				totalSpend: totalSpendAccumulated,
				decreasedSpend: decreasedSpendAccumulated
			};
		});
	}, [data]);
    
	// @ts-ignore
	const handleMouseMove = (event) => {
		const pointerX = event.clientX - event.target.getBoundingClientRect().left;
		const date = xScale.invert(pointerX);
		const nearestPointIndex = accumulatedData.findIndex((d, i, array) => {
			if (i === array.length - 1) return true;
			return new Date(d.date) <= date && date < new Date(array[i + 1].date);
		});
		const d = accumulatedData[nearestPointIndex];
		setTooltip({
			show: true,
			x: pointerX,
			y: event.clientY - event.target.getBoundingClientRect().top,
			// @ts-ignore
			data: d
		});
	};

	const handleMouseLeave = () => {
		setTooltip({ show: false, x: 0, y: 0, data: null });
	};
	// Scales
	const xScale = scaleTime({
		domain: [new Date(data[0].date), new Date(data[data.length - 1].date)],
		range: [margin.left, width - margin.right],
	});

	const yScale = scaleLinear({
		domain: [0, Math.max(...accumulatedData.map(d => d.totalSpend))],
		range: [height - margin.bottom, margin.top],
	});
    
	const totalSpendGradientStart = darkMode ? "#5C255C" : "#A868A8";
	const totalSpendGradientEnd = darkMode ? "#BDADFF" : "#DACBFF";
    
	const decreasedSpendGradientStart = darkMode ? "#96290D" : "#C05629";
	const decreasedSpendGradientEnd = darkMode ? "#FF9980" : "#FFB8A8";
    
	const tooltipFillColor = darkMode ? "#333" : "white";
	const tooltipTextColor = darkMode ? "#fff" : "black";


	const totalSpendGradientFrom = darkMode ? "#BDADFF" : "#5C255C";
	const totalSpendGradientTo = darkMode ? "#5C255C" : "#BDADFF";

	const decreasedSpendGradientFrom = darkMode ? "#004D46" : "#7AE1D8";
	const decreasedSpendGradientTo = darkMode ? "#7AE1D8" : "#004D46";

	const textColor = darkMode ? "white" : "black";
	const axisColor = darkMode ? "white" : "black";
	const tooltipBgColor = darkMode ? "#333333" : "white";
    
	return (
		<svg width={width} height={height} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			{/* Gradient for Accumulated Total Spend */}
			<LinearGradient
				id="totalSpend-gradient"
				from={totalSpendGradientFrom}
				to={totalSpendGradientTo}
				fromOpacity={0.8}
				toOpacity={0.8}
			/>
			{/* Gradient for Accumulated Decreased Spend */}
			<LinearGradient
				id="decreasedSpend-gradient"
				from={decreasedSpendGradientFrom}
				to={decreasedSpendGradientTo}
				fromOpacity={0.8}
				toOpacity={0.8}
			/>
			{/* Area for Accumulated Total Spend */}
			<AreaClosed
				data={accumulatedData}
				x={d => xScale(new Date(d.date))}
				y={d => yScale(d.totalSpend)}
				yScale={yScale}
				strokeWidth={1}
				stroke="transparent"
				fill="url(#totalSpend-gradient)"
				curve={curveMonotoneX}
			/>
			{/* Area for Accumulated Decreased Spend */}
			<AreaClosed
				data={accumulatedData}
				x={d => xScale(new Date(d.date))}
				y={d => yScale(d.decreasedSpend)}
				yScale={yScale}
				strokeWidth={1}
				stroke="transparent"
				fill="url(#decreasedSpend-gradient)"
				curve={curveMonotoneX}
			/>
			<AxisBottom top={height - margin.bottom} scale={xScale} numTicks={5} stroke={axisColor} tickStroke={axisColor} tickLabelProps={() => ({       // Set properties for the tick labels
				fill: textColor,
				fontSize: 10,
				dx: "-1.5em",
				dy: "0.33em"
			})} />
			<AxisLeft left={margin.left} scale={yScale} stroke={axisColor} tickStroke={axisColor} tickLabelProps={() => ({       // Set properties for the tick labels
				fill: textColor,
				fontSize: 10,
				dx: "-3em",
			})} />

			{tooltip.show && tooltip.data && (
				<g transform={`translate(${tooltip.x - tooltipWidth - 10}, ${tooltip.y + 100})`}>
					<rect x={10} y={-55} width={tooltipWidth} height={78} fill={tooltipBgColor} stroke={axisColor} rx={5} ry={5} />
					<text x={15} y={-35} fontSize={12} fill={textColor}>
            Date: {new Date(tooltip.data.date).toLocaleDateString()}
					</text>
					<text x={15} y={-20} fontSize={12} fill={textColor}>
            Real: {tooltip.data.totalSpend.toFixed(2)}
					</text>
					<text x={15} y={-5} fontSize={12} fill={textColor}>
            Optimized: {tooltip.data.decreasedSpend.toFixed(2)}
					</text>
					<text x={15} y={10} fontSize={12} fill={textColor}>
            Savings: {(tooltip.data.totalSpend - tooltip.data.decreasedSpend).toFixed(2)}
					</text>
				</g>
			)}
			{/* Title */}
			<text
				x={titleDx}
				y={titleDy}
				fontSize={18}
				fontWeight="bold"
				textAnchor="middle"
				fill={textColor}
			>
        Real Spending vs Optimal Spending
			</text>

			{/* X-axis label */}
			<text
				x={xLabelDx}
				y={xLabelDy}
				fontSize={12}
				textAnchor="middle"
				fill={textColor}
				fontWeight={700}
			>
        Date
			</text>

			{/* Y-axis label */}
			<text
				x={yLabelDx}
				y={yLabelDy}
				fontSize={12}
				textAnchor="end"
				fill={textColor}
				fontWeight={700}
				// transform="rotate(-90, 25, 15)"
			>
            Amout ($)
			</text>
		</svg>
	);
}
