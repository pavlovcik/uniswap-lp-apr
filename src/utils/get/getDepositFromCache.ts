import { PositionYield, State, StatePosition, PositionTiming, PositionValue } from '../../State';
export type DepositSource = "theGraph" | "user";

export interface Deposit {
	time: number;
	source: DepositSource;
	stats: DepositStat[];
}
export interface DepositStat {
	timestamp: number;
	liquidity: PositionValue["liquidity"];
	fees: PositionValue["fees"];
	elapsed: PositionTiming["elapsed"];
	apr: PositionYield["apr"];
	percentage: PositionYield["percentage"];
}

export function getDepositFromCache(state: State, positionId: number): Deposit {
	const deposit = state.deposits[positionId];
	return deposit;
}
