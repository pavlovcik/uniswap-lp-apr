import {
	Deposit,
	getDepositFromCache,
	getDepositTimeFromSubgraph,
	getDepositTimeFromUserInput,
	getPositionIdFromUrl,
} from ".";
import { State } from "../../State";
import { parse } from "../parse";
import { store } from "../store";

/**
 * This should read from the LocalStorage cache first,
 * and then check the chain in parallel to verify the accuracy of the cached deposit time, if time entered by user.
 * If reading from the chain fails, prompt the user to enter the deposit time
 */

export async function getDeposit(state: State): Promise<Deposit> {
	const positionId = getPositionIdFromUrl();
	if (positionId === -1) {
		throw new Error("No position id found");
	}

	let deposit = getDepositFromCache(state, positionId);
	if (!deposit) {
		// initialize a new deposit
		deposit = state.deposits[positionId] = new Deposit({
			time: -1,
			oracle: "none",
			analytics: [],
		});
	}

	// the only scenario we should not check for the deposit time again is if
	// the cached data is: 1. found and 2. is from theGraph
	if (deposit.oracle !== "theGraph") {
		await getDepositTime(state, positionId);
	}

	return deposit;
}

async function getDepositTime(state: State, positionId: number): Promise<void> {
	try {
		// throw new Error(`testing manual user input`);
		// Fetch deposit time from the graph based on the position ID
		const subgraphResponse = await getDepositTimeFromSubgraph(positionId);
		if (subgraphResponse) {
			state.deposits[positionId].oracle = "theGraph";
			state.deposits[positionId].time = parse.dateFromTheGraph(subgraphResponse);
		}
	} catch (error) {
		// Fallback to user input
		console.error(error);

		const userInputTransactionHash = prompt("Paste deposit transaction hash here");
		if (userInputTransactionHash) {
			const userInputDepositTime = await getDepositTimeFromUserInput(userInputTransactionHash);
			if (userInputDepositTime) {
				state.deposits[positionId].oracle = "user";
				state.deposits[positionId].time = userInputDepositTime;
			}
		} else {
			throw new Error("no user input transaction hash, can not determine deposit time");
		}
	}

	store.write("DEPOSITS", state.deposits);
}
