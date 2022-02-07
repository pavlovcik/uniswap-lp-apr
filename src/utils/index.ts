import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";

export async function main(state: State) {
	const depositTime = get.depositTime(state);
	if (depositTime === -1) {
		return;
	}
	const timings = calculate.timings(depositTime);

	const positionState = {
		id: get.positionIdFromUrl(), // -1 if not found,
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
	};

	dom.syncStatePositionAndDom(state, positionState);
	return state;
}
