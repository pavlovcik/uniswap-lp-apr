import { State } from "../setup/State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";

export async function main(state: State) {
	const depositTime = await get.depositTime(state);
	const timings = calculate.timings(depositTime);
	const positionState = {
		id: get.positionIdFromUrl(),
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
	};
	dom.syncStatePositionAndDom(state, positionState);
	return state;
}
