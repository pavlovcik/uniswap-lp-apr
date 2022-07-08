import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";
import { store } from "./store";

export async function main(state: State) {
	const deposit = get.deposit(state);
	if (!deposit) {
		return;
	}
	const timings = calculate.timings(deposit);

	state.position = {
		id: get.positionIdFromUrl(), // -1 if not found,
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
		precision: store.read("PRECISION"), // decimal precision of displayed values
	};


	// state.storage[positionState.id]
	// state.storage[positionState.id] =
	// store.write("YIELD")
	// positionState.yield.apr
	dom.sync(state);
	return state;
}
