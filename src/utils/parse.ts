import { SerializedTimestamp } from "../State";
import { TimestampQueryResponse } from "./get/getDepositTimeFromSubgraph";

export const parse = {
	dateFromUserInput: parseDateFromUserInput,
	dateFromTheGraph: parseDateFromTheGraph,
};

function parseDateFromUserInput(userInput: string): SerializedTimestamp {
	const userInputDate = new Date(userInput);
	const depositTime = userInputDate.getTime();
	if (!depositTime) {
		throw new SyntaxError(`Invalid date: ${userInput}`);
	}
	return depositTime;
}

function parseDateFromTheGraph(timestamp: TimestampQueryResponse): SerializedTimestamp {
	const depositTime = parseInt(timestamp?.data?.positions[0]?.transaction?.timestamp?.concat(`000`));
	if (!depositTime) {
		throw new TypeError("Could not parse timestamp from The Graph");
	}
	return depositTime;
}
