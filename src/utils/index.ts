import { State } from "../setup/State";
import { calculateTimings } from "./calculate-timings";
import { calculateYield } from "./calculate-yield";
import { getPositionIdFromUrl, syncStatePositionAndDom } from "./common";
import { getPositionValue } from "./get-position-value";
import { getDepositTime } from "./attach-mutation-observer";

export function main(state: State) {
	console.log(state);
	const depositTime = getDepositTime(state);
	const timings = calculateTimings(depositTime);
	const positionState = {
		id: getPositionIdFromUrl(),
		value: getPositionValue(),
		time: timings,
		yield: calculateYield(timings.elapsed),
	};
	return syncStatePositionAndDom(state, positionState);
}
