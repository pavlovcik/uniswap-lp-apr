import { PositionTiming } from "../../State";
import { Deposit } from "../get/getDepositFromCache";

export function calculateTimings(deposit: Deposit): PositionTiming {
	const NOW = Date.now(); // current time global
	const DEPOSIT_TIME = new Date(deposit.time).getTime();
	const timeElapsed = NOW - DEPOSIT_TIME;
	const positionTiming = {
		deposit: DEPOSIT_TIME,
		elapsed: timeElapsed,
	};

	return positionTiming;
}
