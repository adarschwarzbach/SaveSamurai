// Types below, move to types folder

type Category = string; // Dummy type, replace with your actual Category type.

type SpendEntryWithCategory = {
    // Dummy type, replace with your actual SpendEntryWithCategory type.
    category: Category;
    amount: number;
};

type GlobalProviderProps = {
    children: React.ReactNode;
};

// Global State Type
type GlobalStateType = {
  darkMode: boolean;
  loading: boolean;
  loadingChat: boolean;
  report: GenerateInitialReportReturn | null;
  chatHistory: { role: string; content: string; }[];
};

import React, { createContext, useContext, useState } from "react";
import { GenerateInitialReportReturn } from "../types";

const GlobalStateContext = createContext<GlobalStateType | undefined>(
	undefined
);
const GlobalDispatchContext = createContext<
    ((state: Partial<GlobalStateType>) => void) | undefined>(undefined);


export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
	const [state, setState] = useState<GlobalStateType>({
		darkMode: false,
		loading: false,
		report: null,
		loadingChat: false,
		chatHistory: []
	});

	const setGlobalState = (updatedState: Partial<GlobalStateType>) => {
		setState((prev) => ({ ...prev, ...updatedState }));
	};

	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={setGlobalState}>
				{children}
			</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	);
};

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext);
	if (context === undefined) {
		throw new Error("useGlobalState must be used within a GlobalProvider");
	}
	return context;
};

export const useSetGlobalState = () => {
	const context = useContext(GlobalDispatchContext);
	if (context === undefined) {
		throw new Error(
			"useSetGlobalState must be used within a GlobalProvider"
		);
	}
	return context;
};
