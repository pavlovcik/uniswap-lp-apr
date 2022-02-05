import { main } from ".";
import { SerializedTimestamp, State } from "../setup/State";
import { getPositionIdFromUrl, parseDateFromTheGraph, parseDateFromUserInput } from "./common";
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

	function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			main(state);
		}
	}
}

export function getDepositTime(state: State) {
	let depositTime;
	// get from cache
	depositTime = getDepositTimeFromCache(state);
	// get from blockchain
	if (!depositTime) {
		depositTime = getDepositTimeFromBlockchain();
		depositTime = parseDateFromTheGraph(depositTime);
	}
	// get from user manual input
	const userInput = prompt("Paste the deposit time here");
	if (userInput) {
		depositTime = parseDateFromUserInput(userInput);
	}
	if (!depositTime) {
		throw new Error("No deposit time found.");
	}
	return depositTime;
}

function getDepositTimeFromCache(state: State): SerializedTimestamp | undefined {
	const depositTime = state.storage[getPositionIdFromUrl()];
	// if (!depositTime) {
	// 	throw new Error("No deposit time found.");
	// }
	return depositTime;
}

function getDepositTimeFromBlockchain() {
	queryTimestampFromBlockchain;
}
