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

	let { position } = state;

	position = {
		id: get.positionIdFromUrl(), // -1 if not found,
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
		precision: store.read("PRECISION"), // decimal precision of displayed values
	};

	state.deposits[position.id].stats.push({
		timestamp: Date.now(),
		liquidity: position.value.liquidity,
		fees: position.value.fees,
		elapsed: position.time.elapsed,
		apr: position.yield.apr,
		percentage: position.yield.percentage,
	});

	dom.sync(state);
	return state;
}
