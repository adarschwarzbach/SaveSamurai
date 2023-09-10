import React, { useState, useRef, useEffect } from "react";
import { TextArea, Button, Intent, Spinner} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { useGlobalState, useSetGlobalState } from "../../../contexts/GlobalState"; // Assuming this is the correct path
import axios from "axios";

interface TextEntryProps {
  onSubmit: (message: string) => void;
}

const TextEntry: React.FC<TextEntryProps> = ({ onSubmit }) => {
	const [message, setMessage] = useState("");
	const [renderKey, setRenderKey] = useState(0);  // State variable for re-render
	const { darkMode, report, chatHistory, loadingChat } = useGlobalState();
	const globalState = useGlobalState();
	const setGlobalState = useSetGlobalState();

	const [waitingOnChat, setWaitingOnChat] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value);
	};

	const handleSubmit = async () => {
		if (message.trim()) {
			onSubmit(message);
			setMessage("");  // Clear the input after sending
			setWaitingOnChat(true);
	
			// make new Message<>
			const updatedChatHistory = [...globalState.chatHistory, { role: "user", content: message }];
			
			// Update global state
			setGlobalState({ ...globalState, chatHistory: updatedChatHistory });
	
			// Update renderKey to force re-render
			setRenderKey(prevKey => prevKey + 1);
	
			await axios.post("/api/chat", {
				body: {
					chatHistory: updatedChatHistory,
					message,
					categoryGroupedData: report?.categoryGroupedData
				}
			}).then(res => {
				const newMessage = res.data.message;
				updatedChatHistory.push({ role: "assistant", content: newMessage });
				setGlobalState({ ...globalState, chatHistory: updatedChatHistory });
			}).catch(error => console.log(error));
			setWaitingOnChat(false);
		}
	};
	
	
	const darkModeStyles = darkMode ? {
		backgroundColor: "#333",
		color: "#EEE",
		"::placeholder": {
			color: "#777"
		}
	} : {};


	return (
		<div className="relative flex items-end">
			<TextArea
				value={message}
				onChange={handleInputChange}
				growVertically={true}
				placeholder="Ask Samurai a question..."
				onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
				fill={true}
				style={{ ...darkModeStyles, resize: "none", paddingRight: "40px" }}
				intent={"none"}
				// disabled={chatHistory[chatHistory.length -1].role == "user"}
			/>

			
			
			{chatHistory[chatHistory.length - 1].role == "user" ? 
				<div style = {{right:12, position:"absolute", bottom:6}}>
					<Spinner size={20} />
				</div>:
				<Button
					icon="arrow-right"
					intent={Intent.NONE}
					onClick={handleSubmit}
					style={{ position: "absolute", right: "5px", bottom: "5px" }}
				/>}
				
		</div>
	);
};

export default TextEntry;
