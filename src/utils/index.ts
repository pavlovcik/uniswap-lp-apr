import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";
import { store } from "./store";

export function main(state: State) {
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

	console.trace(JSON.stringify(state.position, null, "\t"));

	state.deposits[state.position.id].stats.push({
		timestamp: Date.now(),
		liquidity: state.position.value.liquidity,
		fees: state.position.value.fees,
		elapsed: state.position.time.elapsed,
		apr: state.position.yield.apr,
		percentage: state.position.yield.percentage,
	});

	dom.sync(state);
	return state;
}
