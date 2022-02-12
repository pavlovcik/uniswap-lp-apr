import { DepositTimeSubGraphResponse } from "./get/getDepositTimeFromSubgraph";

export const parse = {
	dateFromUserInput: parseDateFromUserInput,
	dateFromTheGraph: parseDateFromTheGraph,
};

function parseDateFromUserInput(userInput: string): number {
	const message = `Need to verify that the timezone math is implemented correctly here`;
	alert(message);
	const userInputDate = new Date(userInput);
	const depositTime = userInputDate.getTime();
	if (!depositTime) {
		throw new SyntaxError(`Invalid date: ${userInput}`);
	}
	// return depositTime;
	throw new Error(message);
}

function parseDateFromTheGraph(timestamp: DepositTimeSubGraphResponse): number {
	const depositTime = parseInt(timestamp?.data?.positions[0]?.transaction?.timestamp?.concat(`000`));
	if (!depositTime || isNaN(depositTime)) {
		throw new TypeError("Could not parse timestamp from The Graph");
	}
	return depositTime;
}
