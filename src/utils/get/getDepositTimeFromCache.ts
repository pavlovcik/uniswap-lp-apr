import { SerializedTimestamp, State } from "../../State";
export type Sources = "thegraph" | "user";
export type Store = { time: SerializedTimestamp; source: Sources };

export function getDepositTimeFromCache(state: State, positionId: number): Store | undefined {
	const depositTime = state.storage[positionId];
	return depositTime;
}
