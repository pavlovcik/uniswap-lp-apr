import { State } from "../../State";
export type DepositSources = "theGraph" | "user";
export type Deposit = { time: number; source: DepositSources };

export function getDepositFromCache(state: State, positionId: number): Deposit | undefined {
	const depositTime = state.storage[positionId];
	return depositTime;
}
