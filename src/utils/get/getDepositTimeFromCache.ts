import { SerializedTimestamp, State } from "../../State";
import { getPositionIdFromUrl } from "./getPositionIdFromUrl";

export function getDepositTimeFromCache(state: State): SerializedTimestamp | undefined {
	// console.trace(state);
	const depositTime = state.storage[getPositionIdFromUrl()];
	return depositTime;
}
