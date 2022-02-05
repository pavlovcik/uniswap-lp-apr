import { attachMutationObserver } from "../utils/attach-mutation-observer";
import { initializeUI } from "./initialize-ui";
import { queryTimestampFromBlockchain } from "../utils/query-blockchain";
import { State } from "./State";

async function setup(state: State) {
	// First check localStorage if the position deposit time is already stored.
	let positionDepositTime = state.storage[state.position.id];

	if (!positionDepositTime) {
		// If not found, query blockchain for the deposit time.
		positionDepositTime = await queryTimestampFromBlockchain(state.position.id);
	}

	initializeUI(state);
	attachMutationObserver(state);
	return state;
}

// @ts-expect-error attach state to window
window.state = new State();
// @ts-expect-error window property
setup(window.state).then(console.log).catch(console.error);
