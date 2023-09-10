
import Header from "../structural/header/Header";
import React, { useEffect, useState} from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { useGlobalState } from "../../contexts/GlobalState";
import Home from "../home/Home";
import Report from "../report/Report";
import LoadingScreen from "../home/Loading";

export default function MainEntry() {
	const state = useGlobalState();
	const { darkMode, loading, report } = state;
  
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		// Set a flag to know we're on the client side now, not the server
		setIsClient(true);
	}, []);

	const isMobile = () => {
		if (!isClient) return false; // default to non-mobile if not on the client

		// This regex checks for the most common mobile devices
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
	};

	if (isMobile()) {
		return (
			<div style={{ 
				display: "flex", 
				flexDirection: "column",
				justifyContent: "center", 
				alignItems: "center", 
				height: "100vh", 
				fontSize: "20px",
				padding: "20px",
				textAlign:"center"
			}}>
				<h1 style  = {{fontWeight:700}}>SaveSamurai is not currently available on mobile devices.</h1>
				<div style={{height: 20}} />
          Please use a desktop browser to access the site.
			</div>
		);
	}
  

	if (loading) {
		return <LoadingScreen />;
	}
  
	return (
    
		<div
			className={darkMode ? "bp5-dark" : ""}
			style={{ width: "100vw", maxHeight: "100vh", overflow: "hidden" }}
		>
			<Header />{
				report ?
					<Report />
					:
					<Home />}
		</div>
	);
}
