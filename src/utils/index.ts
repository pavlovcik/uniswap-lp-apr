import { attachMutationObserver } from "./attach-mutation-observer";
import { getPositionIdFromUrl, readLocalStorage, setupDomNode } from "./common";
import { initializeUI } from "./initialize-ui";
import { queryTimestampFromBlockchain } from "./query-blockchain";
import { AppState } from "./types";

export const MS_IN_YEAR = 31536000000;

export const appState = {
	storage: readLocalStorage(),
	domNode: setupDomNode(),
	observerAttached: false,
	position: {
		id: getPositionIdFromUrl(),
		liquidity: -1,
		fees: -1,
		worth: {
			liquidity: -1,
			fees: -1,
		},
		time: {
			elapsed: -1,
			deposit: -1,
		},
		yield: {
			percentage: -1,
			apr: -1,
		},
	},
} as AppState;

async function main() {
	// First check localStorage if the position deposit time is already stored.
	let timestamp = appState.storage[appState.position.id];

	if (!timestamp) {
		// If not found, query blockchain for the deposit time.
		const queryTimestamp = `{"query": "{positions(where: {id: ${appState.position.id}}) {transaction {timestamp}}}"}`;
		timestamp = await queryTimestampFromBlockchain(queryTimestamp);
	}

	initializeState(timestamp);

	const virtualState;

	initializeUI(timestamp);
	attachMutationObserver();
}

main().then(console.log).catch(console.error);
