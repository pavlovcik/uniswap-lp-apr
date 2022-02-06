import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";

export async function main(state: State) {
	// console.trace(state);
	const depositTime = await get.depositTime(state);
	const timings = calculate.timings(depositTime);

	const id = get.positionIdFromUrl(); // -1 if not found

	const positionState = {
		id: id,
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
	};
	dom.syncStatePositionAndDom(state, positionState);
	return state;
}
