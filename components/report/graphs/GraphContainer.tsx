import React from "react";
import Radar from "./radar/Radar";
import SpendTimeline from "./spendTimeline/SpendTimeline";
import { useGlobalState } from "../../../contexts/GlobalState";

export default function GraphContainer() {
	const state = useGlobalState();
	const { darkMode } = state;
	return (
		<div className='flex flex-col place-items-center'>
			<SpendTimeline />
			<div style={{ height: 40 }} />
			<h2 style={{
				fontSize: '18px',
				fontWeight: 'bold',
				textAlign: 'center',
				color: darkMode ? 'white' : 'black',
				paddingBottom: '4px'
			}}>
				Real Spending vs Optimized Spending by Category
			</h2>
			<Radar width={420} height={400} />
		</div>
	);
}