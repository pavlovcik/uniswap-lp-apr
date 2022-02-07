import { get } from ".";
import { State } from "../../State";
import { parse } from "../parse";
import { store } from "../store";

import { updateDomNode } from "../dom/updateDomNode";
import { dom } from "../dom/index";
import { Store } from "./getDepositTimeFromCache";

/**
 * This should read from the LocalStorage cache first,
 * and then check the chain in parallel to verify the accuracy of the cached deposit time, if time entered by user.
 * If reading from the chain fails, prompt the user to enter the deposit time
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

	if (!depositTime) {
		throw new Error("No deposit time found.");
	} else {
		if (depositTime.source === "user") {
			verifyDepositTime(state, positionId); // runs in background, async
		}
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
					return (state.storage[positionId] = { source: "thegraph", time: verifiedDepositTime }) as Store;
				}
			}
		})
		.catch((err) => {
			console.error(err);
			const userInput = get.depositTimeFromUserInput();
			if (userInput) {
				return (state.storage[positionId] = { source: "user", time: userInput }) as Store;
			}
		})
		.finally(() => {
			dom.updateDomNode(state);
			store.write(state);
		});
}
