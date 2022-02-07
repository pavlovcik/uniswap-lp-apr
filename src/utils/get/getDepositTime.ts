import { get } from ".";
import { State } from "../../State";
import { parse } from "../parse";
import { store } from "../store";

import { updateDomNode } from "../dom/updateDomNode";

/**
 * This should read from the LocalStorage cache first,
 * and then always check the chain in parallel to verify the accuracy of the cached deposit time.
 * If reading from the chain fails, prompt the user to enter the deposit time
 *
 * Needs to be able to update deposit time state asynchronously
 */

export function getDepositTime(state: State) {
	const positionId = get.positionIdFromUrl();
	if (positionId === -1) {
		state.position.id = positionId;
		state.position.time.deposit = 0;
		state.position.time.elapsed = 0;
		state.position.yield.percentage = 0;
		state.position.yield.apr = 0;
		state.position.value.liquidity = 0;
		state.position.value.fees = 0;
		updateDomNode(state);
		console.warn("No position id found");
		return -1;
	}

	const depositTime = get.depositTimeFromCache(state, positionId);

	verifyDepositTime(state, positionId); // runs in background, async

	if (!depositTime) {
		throw new Error("No deposit time found.");
	} else {
		// save once deposit time found
		state.storage[positionId] = depositTime;
		store.write(state);
		return depositTime;
	}
}

function verifyDepositTime(state: State, positionId: number) {
	return get
		.depositTimeFromSubgraph(positionId)
		.then((subgraphResponse) => {
			if (subgraphResponse) {
				const verifiedDepositTime = parse.dateFromTheGraph(subgraphResponse);
				if (verifiedDepositTime) {
					// update the state with the new deposit time
					return (state.storage[positionId] = verifiedDepositTime);
				}
			}
		})
		.catch((err) => {
			console.error(err);
			const userInput = get.depositTimeFromUserInput();
			if (userInput) {
				return (state.storage[positionId] = userInput);
			}
		})
		.finally(() => store.write(state));
}
