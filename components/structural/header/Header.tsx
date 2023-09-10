import React, { useState } from "react";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {
	useGlobalState,
	useSetGlobalState
} from "../../../contexts/GlobalState";
import { useRouter } from "next/router";

// import ProjectInfoPopup from '../Modals/ProjectInfoPopover';

interface Props {
    className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
	const [isOpen, setIsOpen] = useState(false);
	const state = useGlobalState();
	const setGlobalState = useSetGlobalState();
	const { darkMode } = state;

	const toggleDarkMode = () => {
		setGlobalState({ ...state, darkMode: !darkMode });
	};
	const router = useRouter();
	const goToAbout = () => {
		router.push("/about");
	};


	return (
		<Navbar
			className={`${className} .header-banner-class-name`}
			style={{
				width: "100vw",
				marginLeft: 0,
				backgroundColor: darkMode ? "" : "#ABB3BF"
			}}
		>
			<Navbar.Group
				align={Alignment.LEFT}
				className={`${className} background`}
			>
				<Navbar.Heading style={{ marginRight: 0, fontWeight: 700 }}  onClick={() => window.location.reload()}>
					{/* <a href=""" className='lab-link'> */}
                    SaveSamurai
					{/* </a> */}
				</Navbar.Heading>
				<Navbar.Divider />
				<Navbar.Heading style={{ fontSize: 12, marginLeft: 0 }}>
					{" "}
                    Slash Your Spending
				</Navbar.Heading>
			</Navbar.Group>
			<Navbar.Group align={Alignment.RIGHT}>
				<Button
					className="bp5-minimal"
					icon={darkMode ? "flash" : "moon"}
					text={darkMode ? "Light Mode" : "Dark Mode"}
					onClick={() => toggleDarkMode()}
				/>
				<Button
					className="bp5-minimal"
					icon="info-sign"
					text="About"
					onClick={goToAbout}
				/>
			</Navbar.Group>
		</Navbar>
	);
};

export default Header;
