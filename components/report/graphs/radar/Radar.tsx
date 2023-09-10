import React from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Point } from "@visx/point";
import { Line, LineRadial } from "@visx/shape";
import "@blueprintjs/core/lib/css/blueprint.css";
import { useGlobalState } from "../../../../contexts/GlobalState";


export type RadarProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    levels?: number;
};

const defaultMargin = { top: 40, left: 80, right: 80, bottom: 80 };

export default function Radar({ width, height, levels = 5, margin = defaultMargin }: RadarProps) {
	const state = useGlobalState();
	const { report } = state;
	const data = report?.graphs?.radar ?? [];



	const orange = "#9881F3";
	const pumpkin = "#634DBF";
	const silver = "#F6F7F9";
	const background = "#C5CBD3";
	const blue = "#007067";
	const lightblue = "#00A396";

	const degrees = 360;


    const y = (d: { category: string; totalSpending: number; reducedSpending: number }) => d?.totalSpending || 0;
    // @ts-ignore
	const yNormal = (d: { category: string; spending: number; normalSpending: number }) => d?.reducedSpending || 0;


	const genAngles = (length: number) =>
		[...new Array(length + 1)].map((_, i) => ({
			angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
		}));

	const genPoints = (length: number, radius: number) => {
		const step = (Math.PI * 2) / length;
		const offset = 4.5 * (Math.PI * 2 / length);  // Adjustment for the 4.5 item offset
		return [...new Array(length)].map((_, i) => ({
			x: radius * Math.sin(i * step + Math.PI / 2 + offset),  // Added the offset
			y: radius * Math.cos(i * step + Math.PI / 2 + offset),
		}));
	};
    
    

	function genPolygonPoints<Datum>(
		dataArray: Datum[],
		scale: (n: number) => number,
		getValue: (d: Datum) => number,
		getValueNormal: (d: Datum) => number,
	) {
		const step = (Math.PI * 2) / dataArray.length;
		const points: { x: number; y: number }[] = new Array(dataArray.length).fill({ x: 0, y: 0 });
		const pointsNormal: { x: number; y: number }[] = new Array(dataArray.length).fill({ x: 0, y: 0 });

		const pointString = new Array(dataArray.length + 1).fill("").reduce((res, _, i) => {
			if (i > dataArray.length) return res;
			const xVal = scale(getValue(dataArray[i - 1])) * Math.sin(i * step);
			const yVal = scale(getValue(dataArray[i - 1])) * Math.cos(i * step);
			points[i - 1] = { x: xVal, y: yVal };
			res += `${xVal},${yVal} `;
			return res;
		}, "");

		const pointStringNormal = new Array(dataArray.length + 1).fill("").reduce((res, _, i) => {
			if (i > dataArray.length) return res;
			const xVal = scale(getValueNormal(dataArray[i - 1])) * Math.sin(i * step);
			const yVal = scale(getValueNormal(dataArray[i - 1])) * Math.cos(i * step);
			pointsNormal[i - 1] = { x: xVal, y: yVal };
			res += `${xVal},${yVal} `;
			return res;
		}, "");

		return { points, pointString, pointsNormal, pointStringNormal };
	}


    
	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;
	const radius = Math.min(xMax, yMax) / 2 + 20;

	const radialScale = scaleLinear<number>({
		range: [0, Math.PI * 2],
		domain: [degrees, 0],
	});

	const yScale = scaleLinear<number>({
        range: [0, radius],
         // @ts-ignore
		domain: [0, Math.max(...data.map(y))],
	});

	const webs = genAngles(data.length);
	const points = genPoints(data.length, radius);
	// @ts-ignore
	const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, y, yNormal);
	const zeroPoint = new Point({ x: 0, y: 0 });


	return width < 10 ? null : (
		<svg width={width} height={height}>
			<rect fill={background} width={width} height={height - 20} rx={14} />
			<Group top={height / 2 - margin.top} left={width / 2}>
				{[...new Array(levels)].map((_, i) => (
					<LineRadial
						key={`web-${i}`}
						data={webs}
						angle={(d) => radialScale(d.angle) ?? 0}
						radius={((i + 1) * radius) / levels}
						fill="none"
						stroke={silver}
						strokeWidth={2}
						strokeOpacity={0.8}
						strokeLinecap="round"
					/>
				))}
				{[...new Array(data.length)].map((_, i) => (
					<Line key={`radar-line-${i}`} from={zeroPoint} to={points[i]} stroke={silver} />
				))}
				<polygon
					points={polygonPoints.pointString}
					fill={orange}
					fillOpacity={0.3}
					stroke={orange}
					strokeWidth={1}
				/>
				{polygonPoints.points.map((point, i) => (
					<circle key={`radar-point-${i}`} cx={point.x} cy={point.y} r={4} fill={pumpkin} />
				))}
				<polygon
					points={polygonPoints.pointStringNormal}
					fill={lightblue}
					fillOpacity={0.3}
					stroke={blue}
					strokeWidth={1}
				/>
				{polygonPoints.pointsNormal.map((point, i) => (
					<circle key={`radar-normal-point-${i}`} cx={point.x} cy={point.y} r={4} fill={blue} />
				))}
				{/* Labels */}
				{points.map((point, i) => (
					<text
						key={`label-${i}`}
						x={point.x}
						y={point.y}
						fontSize="12"
						textAnchor="middle"
						dominantBaseline="middle"
						fontWeight={500}
					>
						{data[(i + 6) % data.length].category} {/* Adjusted index for 4 item offset */}
					</text>
				))}
                
			</Group>
			<Group left={width - 402} top={height - margin.bottom + 20}>
				{/* Spending by category */}
				<circle cx={20} cy={0} r={5} fill={orange} />
				<text dx={30} dy={5} style={{
					fontFamily: "Arial, sans-serif",
					fontWeight: 500, // Medium or semibold font weight
					fill: "#333", // Dark gray text color
					fontSize: "14px", // Font size
					letterSpacing: "0.025em", // Letter spacing for readability
				}}>
                Real Spending
				</text>

				{/* Spending without poor purchases */}
				<circle cx={240} cy={0} r={5} fill={blue} />
				<text dx={250} dy={5} style={{
					fontFamily: "Arial, sans-serif",
					fontWeight: 500,
					fill: "#333",
					fontSize: "14px",
					letterSpacing: "0.025em",
				}}>
                Optimized Spending
				</text>
			</Group>
		</svg>
	);
}