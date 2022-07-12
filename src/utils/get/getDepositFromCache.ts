import { PositionTiming, PositionValue, PositionYield, State } from "../../State";
export type DepositOracle = "theGraph" | "user" | "none";

export class Deposit {
	time: number;
	oracle: DepositOracle;
	analytics: DepositAnalytic[];
	constructor({
		time,
		oracle,
		analytics,
	}: {
		time: Deposit["time"];
		oracle: Deposit["oracle"];
		analytics: Deposit["analytics"];
	}) {
		this.time = time;
		this.oracle = oracle;
		this.analytics = analytics;
	}
}
export interface DepositAnalytic {
	timestamp: number;
	liquidity: PositionValue["liquidity"];
	fees: PositionValue["fees"];
	elapsed: PositionTiming["elapsed"];
	apr: PositionYield["apr"];
	percentage: PositionYield["percentage"];
}

export function getDepositFromCache(state: State, positionId: number) {
	const deposit = state.deposits[positionId] as Deposit | undefined;
	// if (!deposit) {
	// 	console.warn(`no deposit found in cache`);
	// }
	return deposit;
}
