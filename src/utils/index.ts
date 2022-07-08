import { State } from "../State";
import { calculate } from "./calculate";
import { dom } from "./dom";
import { get } from "./get";
import { store } from "./store";
import { DepositStat, Deposit } from "./get/getDepositFromCache";

export function main(state: State) {
	const _deposit = get.deposit(state);
	if (!_deposit) {
		return;
	}
	const timings = calculate.timings(_deposit);

	state.position = {
		id: get.positionIdFromUrl(), // -1 if not found,
		value: get.positionValue(),
		time: timings,
		yield: calculate.yield(timings.elapsed),
		precision: store.read("PRECISION"), // decimal precision of displayed values
	};

	const deposits = state.deposits as Deposit[];

	const depositStat = {
		timestamp: Date.now(),
		position: state.position,
	} as DepositStat;

	deposits[state.position.id].stats.push(depositStat);

	dom.sync(state);
	return state;
}
