import { SerializedTimestamp } from "../setup/State";
import { TimestampQueryResponse } from "./network";

export const parse = {
	dateFromUserInput: parseDateFromUserInput,
	dateFromTheGraph: parseDateFromTheGraph,
};

function parseDateFromUserInput(userInput: string): SerializedTimestamp {
	const userInputDate = new Date(userInput);
	const depositTime = userInputDate.getTime();
	return depositTime;
}

function parseDateFromTheGraph(timestamp: TimestampQueryResponse): SerializedTimestamp {
	const depositTime = parseInt(timestamp.data.positions[0].transaction.timestamp.concat(`000`));
	return depositTime;
}
