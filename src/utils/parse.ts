import { DepositTimeSubGraphResponse } from "./get/getDepositTimeFromSubgraph";

export const parse = {
	dateFromUserInput: parseDateFromUserInput,
	dateFromTheGraph: parseDateFromTheGraph,
};

function parseDateFromUserInput(userInput: string) {
	const userInputDate = new Date(userInput);
	const depositTime = userInputDate.getTime();
	if (!depositTime) {
		throw new SyntaxError(`Invalid date: ${userInput}`);
	}
}

function parseDateFromTheGraph(timestamp: DepositTimeSubGraphResponse): number {
	const depositTime = Number(timestamp?.data?.positions[0]?.transaction?.timestamp?.concat(`000`));
	if (!depositTime || isNaN(depositTime)) {
		throw new TypeError("Could not parse timestamp from The Graph");
	}
	return depositTime;
}
