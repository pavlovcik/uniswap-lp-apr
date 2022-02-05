import { main } from "../utils";
import { attachMutationObserver } from "../utils/attach-mutation-observer";
import { writeLocalStorage } from "../utils/common";
import { State } from "./State";

(async function setup(state: State) {
	const newDepositTime = prompt(`APR: ${state.position.yield.apr}\nPaste in a new deposit time to update.`);
	if (newDepositTime) {
		state.storage[state.position.id] = newDepositTime;
		writeLocalStorage(state);
	}
	main(state);
	attachMutationObserver(state);
	return state;
})((window.state = new State()));
declare global {
	interface Window {
		state: State;
	}
}
