import { State } from "../../State";
import { network } from "../network";
import { parse } from "../parse";
import { store } from "../store";
import { getDepositTimeFromCache } from "./getDepositTimeFromCache";
import { getPositionIdFromUrl } from "./getPositionIdFromUrl";

export async function getDepositTime(state: State) {
	// console.trace(state);
	let depositTime;
	// get from cache
	depositTime = getDepositTimeFromCache(state);
	// get from blockchain
	if (!depositTime) {
		depositTime = await network.queryTimestampFromBlockchain(getPositionIdFromUrl());
		depositTime = parse.dateFromTheGraph(depositTime);
	}
	if (!depositTime) {
		// get from user manual input
		const userInput = prompt("Paste the deposit time here");
		if (userInput) {
			depositTime = parse.dateFromUserInput(userInput);
		}
	}

	if (!depositTime) {
		throw new Error("No deposit time found.");
	} else {
		// save once deposit time found
		state.storage[state.position.id] = depositTime;
		store.write(state);
		return depositTime;
	}
}
