import { State } from "../setup/State";
import { getDepositTime } from "./attach-mutation-observer";
import { calculateTimings } from "./calculate-timings";
import { calculateYield } from "./calculate-yield";
import { getPositionIdFromUrl, syncStatePositionAndDom } from "./common";
import { getPositionValue } from "./get-position-value";

export async function main(state: State) {
	console.log(state);
	const depositTime = await getDepositTime(state);
	const timings = calculateTimings(depositTime);
	const positionState = {
		id: getPositionIdFromUrl(),
		value: getPositionValue(),
		time: timings,
		yield: calculateYield(timings.elapsed),
	};
	return syncStatePositionAndDom(state, positionState);
}
