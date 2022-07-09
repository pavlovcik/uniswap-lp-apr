import { parse } from "../parse";
import { Deposit, DepositStat } from "./getDepositFromCache";

export function getDepositFromUserInput(): Deposit {
	const userInputTime = prompt("Paste the deposit time here");
	const deposit = {
		time: -1,
		source: "user",
		stats: [] as DepositStat[],
	} as Deposit;

	if (userInputTime) {
		deposit.time = parse.dateFromUserInput(userInputTime);
	}

	return deposit;
}
