import { main } from ".";
import { SerializedTimestamp, State } from "../setup/State";
import { getPositionIdFromUrl, parseDateFromTheGraph, parseDateFromUserInput, writeLocalStorage } from "./common";
import { queryTimestampFromBlockchain } from "./query-blockchain";

export function attachMutationObserver(state: State) {
	if (state.observerAttached) {
		throw new Error("Mutation observer already attached.");
	}

	state.observerAttached = true;

	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));

	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});

	async function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			await main(state);
		}
	}
}

export async function getDepositTime(state: State) {
	let depositTime;
	// get from cache
	depositTime = getDepositTimeFromCache(state);
	// get from blockchain
	if (!depositTime) {
		depositTime = await queryTimestampFromBlockchain(getPositionIdFromUrl());
		depositTime = parseDateFromTheGraph(depositTime);
	}
	// get from user manual input
	const userInput = prompt("Paste the deposit time here");
	if (userInput) {
		depositTime = parseDateFromUserInput(userInput);
	}
	if (!depositTime) {
		throw new Error("No deposit time found.");
	} else {
		// save once deposit time found
		writeLocalStorage(state);
		return depositTime;
	}
}

function getDepositTimeFromCache(state: State): SerializedTimestamp | undefined {
	const depositTime = state.storage[getPositionIdFromUrl()];
	// if (!depositTime) {
	// 	throw new Error("No deposit time found.");
	// }
	return depositTime;
}
