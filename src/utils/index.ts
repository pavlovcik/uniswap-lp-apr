import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";
import { DepositStat } from "./get/getDepositFromCache";
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

	const stats = state.deposits[state.position.id].stats || ([] as DepositStat[]);

	stats.push({
		timestamp: Date.now(),
		liquidity: state.position.value.liquidity,
		fees: state.position.value.fees,
		elapsed: state.position.time.elapsed,
		apr: state.position.yield.apr,
		percentage: state.position.yield.percentage,
	});

	state.deposits[state.position.id].stats = stats.filter(
		(v, i, a) => a.findIndex((v2) => JSON.stringify(v2) === JSON.stringify(v)) === i
	);

	store.write("DEPOSITS", state.deposits);

	dom.sync(state);
	return state;
}
