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

	const deposits = state.deposits;

	const depositStat = {
		timestamp: Date.now(),
		position: state.position,
	} as DepositStat;

	deposits[state.position.id].stats.push(depositStat);
	// deposit.stats.push(depositStat);

	dom.sync(state);
	return state;
}
