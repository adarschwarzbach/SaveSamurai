import React, { useState, useEffect } from "react";
import { Spinner } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

const loadingTexts = [
	"Generating Report",
	"Crunching Numbers",
	"Creating Insights",
	"Optimizing Spending",
	"Analyzing Data"
];

const LoadingScreen = () => {
	const [currentText, setCurrentText] = useState(loadingTexts[0]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setCurrentText(loadingTexts[currentIndex]);
	}, [currentIndex]);

	return (
		<div style = {{width:"200", height: "100vh", backgroundColor:"black", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
			<h1 className="text-2xl font-bold" style={{ color: "white" }}>{currentText}</h1>
			<div style={{ height: 40 }} />
			<Spinner className="mb-1" size={100} />
		</div>
	);
};

export default LoadingScreen;
