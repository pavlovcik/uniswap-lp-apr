import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";

export async function main(state: State) {
	const deposit = get.deposit(state);
	if (!deposit) {
		return;
	}
	const timings = calculate.timings(deposit);

	const positionState = {
		id: get.positionIdFromUrl(), // -1 if not found,
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
	};

	dom.syncStatePositionAndDom(state, positionState);
	return state;
}
