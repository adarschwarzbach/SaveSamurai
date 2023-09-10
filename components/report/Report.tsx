import React from "react";
import Message from "./chat/Message";
import TextEntry from "./chat/TextEntry";
import { useGlobalState, useSetGlobalState } from "../../contexts/GlobalState";
import ChatContainer from "./chat/ChatContainer";
import GraphContianer from "./graphs/GraphContainer";

enum Sender {
    ADVISOR = "advisor",
    USER = "user",
}
  

export default function Report() {
	const state = useGlobalState();
	const { darkMode } = state;
	return (
		<div style={{ display: "flex", }} className= {darkMode ? "bg-bp-light-gray1 text-white bp3-dark" : "bg-white text-black"}>
			<div style={{ flex: 1, margin: "1%", border: "0px solid black", height: "100vh" }}>
				<ChatContainer darkMode={darkMode} />
			</div>
			<div style={{ flex: 1, margin: "1%", border: "0px solid black", height: "100vh" }}>
				<GraphContianer />
			</div>
		</div>
	);
}
