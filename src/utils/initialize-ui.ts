import { calculateTimings } from "./calculate-timings";
import { updateDomNode, writeLocalStorage } from "./common";
import { appState } from ".";
import { scrapePositionWorth } from "./scrape-position-worth";
import { TimestampQueryResponse } from "./types";

// Only needs to run once
export function initializeUI(timestamp: TimestampQueryResponse): TimestampQueryResponse {
	// const worth = scrapePositionWorth();
	// // explicit state update
	// Object.assign(appState.position.worth, worth);

	// calculateTimings(timestamp);
	// console.log(appState);
	updateDomNode();
	const newDepositTime = prompt(`APR: ${appState.position.projectedAPR}\nPaste in a new deposit time to update.`);
	if (newDepositTime) {
		appState.storage[appState.position.id] = newDepositTime;
		writeLocalStorage();
	}
	return timestamp;
}
