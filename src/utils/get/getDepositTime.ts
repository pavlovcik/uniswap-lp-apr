import { get } from ".";
import { State } from "../../State";
import { parse } from "../parse";
import { store } from "../store";
import { getDepositTimeFromCache } from "./getDepositTimeFromCache";
import { getDepositTimeFromUserInput } from "./getDepositTimeFromUserInput";

export async function getDepositTime(state: State) {
	let depositTime;
	depositTime = getDepositTimeFromCache(state);

	if (!depositTime) {
		depositTime = await get.depositTimeFromSubgraph(get.positionIdFromUrl());
		depositTime = parse.dateFromTheGraph(depositTime);
	}

	if (!depositTime) {
		depositTime = getDepositTimeFromUserInput();
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
