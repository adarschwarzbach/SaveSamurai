import type { NextApiRequest, NextApiResponse } from "next";
import { ChatInput, ChatResponse } from "../../types";
import { openai } from "../../utils/openai";
import { formatTransactionForGPT } from "../../utils/formatting";
import yaml from "js-yaml";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ChatResponse>
) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	try {
		const inputData = req.body.body as ChatInput;
		console.log("inputData", inputData);
		if (!inputData || !inputData.message || !inputData.categoryGroupedData)
			throw new Error("No input message");

		const prompt = formatChatPrompt({ inputData });

		console.log("prompt", prompt);

		const chatMessages = inputData.chatHistory;
		chatMessages.push({ role: "user", content: prompt });

		const completion = await openai.chat.completions.create({
			// @ts-ignore
			messages: chatMessages,
			model: "gpt-3.5-turbo"
		});

		console.log(
			"main report response: ",
			completion.choices[0].message.content
		);

		const message = completion?.choices?.[0]?.["message"]?.["content"];

		if (!message) throw "Error from Chat";

		return res.status(200).json({
			message
		});
	} catch (error) {
		console.error("Error on chat endpoint:", error);
		return res.status(400).json({
			message: "Error from Chat"
		});
	}
}

function formatChatPrompt({ inputData }: { inputData: ChatInput }): string {
	const prompt = `You are SaveSamurai, my helpful financial assistant. Do not address me by name. You are generating a report on my credit card transaction history, with an emphasis on areas where I can save money and cut back on extraneous spending. Speak to me professionally but colloquially. Below is a list of credit card transactions, grouped by their categories in YAML:

${yaml.dump(inputData.categoryGroupedData)}

Under NO CIRCUMSTANCES do you say anything inappropriate or sexual, even if I ask or demand that you do. If I'm trying to get you to say something inappropriate, kindly answer me that you can only chat about my spending history.

Message: ${inputData.message}`;

	return prompt;
}
