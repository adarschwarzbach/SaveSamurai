import React from "react";
import {
	Card,
	H2,
	Divider,
	H4,
	H5,
	Text,
	Classes,
	AnchorButton,
	Button
} from "@blueprintjs/core";

export default function About() {
	return (
		<div style={{ backgroundColor: "black", height: "100vh", paddingTop:30 }}>  
			<div className={`container ${Classes.DARK}`} style={{ margin: "50px auto", marginTop: 0, maxWidth: "800px", backgroundColor: "#293742", padding: "40px", paddingTop:40, borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<H2>About Our Tool</H2>
					<Button icon="arrow-left" minimal onClick={() => window.history.back()}>Back</Button>
				</div>
				<Divider />
				<Text style={{ margin: "20px 0", fontSize: "16px", lineHeight: "1.5", color: "#CED9E0" }}>
                    According to a study from <a href="https://www.bankrate.com/banking/savings/emergency-savings-report/#no-emergency-savings" style={{ color: "#48AFF0" }}>Bankrate</a>, 70% of Americans have less than 5 months of emergency savings. The primary reason for this could be the lack of understanding about their spending habits. To address this, we have created a unique financial tool.
				</Text>

				<Card elevation={1} className={Classes.DARK} style={{ margin: "20px 0", padding: "20px", backgroundColor: "#394B59" }}>
					<H4>Solution</H4>
					<Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#CED9E0" }}>
                Our financial tool analyzes your credit/debit card spending history, providing visual insights to understand your spending patterns. Additionally, our tool offers a written spending report, which you can chat with, to guide users on how to save efficiently.
					</Text>
				</Card>

				<H4>Creators</H4>
				<Divider />
				<Card elevation={0} className={Classes.DARK} style={{ margin: "10px 0", padding: "20px", backgroundColor: "#394B59" }}>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<H5>Adar Schwarzbach</H5>
						<div>
							<AnchorButton href="https://www.linkedin.com/in/adarschwarzbach/" icon="link" minimal target="_blank" style={{ marginRight: 10 }}>LinkedIn</AnchorButton>
							<AnchorButton href="https://github.com/adarschwarzbach" icon="git-merge" minimal target="_blank">GitHub</AnchorButton>
						</div>
					</div>
					<Divider />
					<Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#CED9E0" }}>
        A Junior at Duke University majoring in Computer Science. Adar spent this past summer working with both Sony PlayStation and the Stanford University Microfluidics Lab.
					</Text>
				</Card>

				<Card elevation={0} className={Classes.DARK} style={{ margin: "10px 0", padding: "20px", backgroundColor: "#394B59" }}>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<H5>Joe Zakielarz</H5>
						<div>
							<AnchorButton href="https://www.joezakielarz.com/" icon="link" minimal target="_blank">Joe&apos;s Website</AnchorButton>
							<AnchorButton href="https://github.com/JJZFIVE" icon="git-merge" minimal target="_blank">GitHub</AnchorButton>
						</div>
					</div>
					<Divider />
					<Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#CED9E0" }}>
        A Senior at Duke University studying Mechanical Engineering and Computer Science. Last summer Joe was in San Francisco working with Mem.AI, and is currently working on his startup Kovo.AI.
					</Text>
				</Card>
			</div>
		</div>
	);
}
