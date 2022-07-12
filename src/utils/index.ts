import { State } from "../State";
import { calculate } from "./calculate";
import { syncDom } from "./dom";
import { getDeposit, getPositionIdFromUrl, getPositionValue } from "./get";
import { DepositAnalytic } from "./get/getDepositFromCache";
import outliers from "outliers";
import { store } from "./store";

export async function main(state: State) {
	const deposit = await getDeposit(state);
	// console.table(deposit?.analytics);
	if (!deposit) {
		return;
	}

	const timings = calculate.timings(deposit);

	state.position = {
		id: getPositionIdFromUrl(), // -1 if not found,
		value: getPositionValue(),
		time: timings,
		yield: calculate.yield(state, timings.elapsed),
		precision: store.read("PRECISION"), // decimal precision of displayed values
	};

	const stats = state.deposits[state.position.id].analytics || ([] as DepositAnalytic[]);

	stats.push({
		timestamp: Date.now(),
		liquidity: state.position.value.liquidity,
		fees: state.position.value.fees,
		elapsed: state.position.time.elapsed,
		apr: state.position.yield.apr,
		percentage: state.position.yield.percentage,
	});

	// filter by liquidity amount
	state.deposits[state.position.id].analytics = [
		...new Map(state.deposits[state.position.id].analytics?.map((v) => [v.liquidity, v])).values(),
	];

	// remove APR outliers
	state.deposits[state.position.id].analytics = state.deposits[state.position.id].analytics.filter(outliers("apr"));

	store.write("DEPOSITS", state.deposits);

	syncDom(state);
	return state;
}
