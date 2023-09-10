import React from "react";
import { Card, Icon, Elevation } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useGlobalState, useSetGlobalState } from "../../contexts/GlobalState";
import axios from "axios";
import { examplePeopleData } from "../../utils/examplePeopleData";
import { GenerateInitialReportReturn } from "../../types";

interface FileCardProps {
    text: string;
    file: "person1" | "person2" | "person3";
}

const SampleUpload: React.FC<FileCardProps> = ({ text, file }) => {
	const setGlobalState = useSetGlobalState();
	const state = useGlobalState();

	return (
		<Card
			interactive={true}
			elevation={Elevation.TWO}
			onClick={async () => {
				setGlobalState({ ...state, loading: true });
				const personData = examplePeopleData[file];
				console.log(personData);
				await axios
					.post("/api/generateInitialReport", {
						body: {
							rawData: personData
						}
					})
					.then((res) => {
						const report: GenerateInitialReportReturn = res.data;
						setGlobalState({
							...state,
							loading: false,
							report: report,
							chatHistory: [{role: "assistant", content: report.chat.report}]
						});

						console.log("AXIOS RESPONSE:", res.data);
					})
					.catch((error) => {
						setGlobalState({
							...state,
							loading: false,
							report: null,
							chatHistory: []
						});
						console.log(error);
					});
			}}
			className="flex flex-col items-center justify-center p-6 m-12 w-48"
		>
			<Icon icon={IconNames.DOCUMENT} iconSize={40} className="mb-4" />
			<div className="text-center">{text}</div>
		</Card>
	);
};

export default SampleUpload;
