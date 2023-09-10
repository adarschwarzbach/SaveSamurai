import React, { useState } from "react";
import Message from "./Message";
import TextEntry from "./TextEntry";
import { useGlobalState } from "../../../contexts/GlobalState";
import { Spinner } from "@blueprintjs/core";

type ChatContainerProps = {
    darkMode: boolean;
}

enum Sender {
    ADVISOR = "advisor",
    USER = "user",
}

const ChatContainer: React.FC<ChatContainerProps> = ({ darkMode }) => {
	const state = useGlobalState();
	const report = state.report;
	const chatHistory = state.chatHistory;
	const loadingChat = state.loadingChat;
	const [refreshKey, setRefreshKey] = useState<number>(0);

	const handleSubmit = () => {
		// Increment the key to force re-render
		setRefreshKey(prevKey => prevKey + 1);
	};

	return (
		<div style={{ flex: 1, margin: "1%", border: "0px solid black", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }} className="relative">
            
			<div className="overflow-y-auto h-[calc(100vh-70px)]">
				{
					chatHistory.length > 0 ? chatHistory.map((messageObj, index) => (
						
						<Message 
							key={index}
							text={messageObj.content ?? "No message text"}
							sender={messageObj.role === "user" ? Sender.USER : Sender.ADVISOR}
						/>
					))
						: <Message text="No report found" sender={Sender.ADVISOR} />
				}
				{/* {
					loadingChat && <Spinner size = {20} />
				} */}

				<div style={{height:120}} />
			</div>

			<div className="absolute bottom-20 left-0 right-0 pb-2">
				<TextEntry key={refreshKey} onSubmit={handleSubmit} />
			</div>
            
			<div style={{height:40,marginTop:-18,position:"relative", backgroundColor: darkMode ? "#1C2127" : "white"}} />
		</div>
	);
};

export default ChatContainer;




{/* <Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.ADVISOR}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.USER}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.ADVISOR}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.USER}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.ADVISOR}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.USER}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.ADVISOR}
/>
<Message 
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum..." 
sender={Sender.USER}
/> */}