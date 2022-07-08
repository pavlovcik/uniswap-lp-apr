import { State } from "../../State";
export type DepositSource = "theGraph" | "user";
export interface DepositStat {
	timestamp: number;
	position: State["position"];
	// time.elapsed = 0;
	// yield.percentage = 0;
	// yield.apr = 0;
	// value.liquidity = 0;
	// value.fees = 0;
}
export type Deposit = {
	time: number;
	source: DepositSource;
	stats: DepositStat[];
};

export function getDepositFromCache(state: State, positionId: number): Deposit | undefined {
	const depositTime = state.deposits[positionId];
	return depositTime;
}
