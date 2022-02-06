import { SerializedTimestamp, State } from "../../State";

export function getDepositTimeFromCache(state: State, positionId: number): SerializedTimestamp | undefined {
	const depositTime = state.storage[positionId];
	return depositTime;
}
