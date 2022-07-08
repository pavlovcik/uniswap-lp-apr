import { parse } from "../parse";
import { Deposit } from "./getDepositFromCache";

export function getDepositFromUserInput(): Deposit | undefined {
	const userInputTime = prompt("Paste the deposit time here");
	if (userInputTime) {
		return {
			time: parse.dateFromUserInput(userInputTime),
			source: "user",
			stats: [],
		};
	}
}
