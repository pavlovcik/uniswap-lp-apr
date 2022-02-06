import { parse } from "../parse";

export function getDepositTimeFromUserInput() {
	const userInput = prompt("Paste the deposit time here");
	if (userInput) {
		return parse.dateFromUserInput(userInput);
	}
}
