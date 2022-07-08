import { State, StatePosition } from "../../State";
export type DepositSource = "theGraph" | "user";

export interface Deposit {
	time: number;
	source: DepositSource;
	stats: DepositStat[];
}
export interface DepositStat {
	timestamp: number;
	position: StatePosition;
}

export function getDepositFromCache(state: State, positionId: number): Deposit {
	const deposit = state.deposits[positionId];
	return deposit;
}
