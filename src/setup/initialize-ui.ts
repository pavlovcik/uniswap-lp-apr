import { State } from "./State";
import { writeLocalStorage } from "../utils/common";
import { main } from "../utils";

// Only needs to run once
export function initializeUI(state: State) {
	const newDepositTime = prompt(`APR: ${state.position.yield.apr}\nPaste in a new deposit time to update.`);
	if (newDepositTime) {
		state.storage[state.position.id] = newDepositTime;
		writeLocalStorage(state);
	}
	return main(state);
}
