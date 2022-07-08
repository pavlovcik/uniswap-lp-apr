import { get } from ".";
import { main } from "..";
import { Deposits, State } from "../../State";
import { dom } from "../dom";
import { parse } from "../parse";
import { store } from "../store";
import { Deposit } from "./getDepositFromCache";

/**
 * This should read from the LocalStorage cache first,
 * and then check the chain in parallel to verify the accuracy of the cached deposit time, if time entered by user.
 * If reading from the chain fails, prompt the user to enter the deposit time
 */

export function getDeposit(state: State): Deposit | undefined {
	const positionId = get.positionIdFromUrl();
	if (positionId === -1) {
		state.position.id = positionId;
		state.position.time.deposit = 0;
		state.position.time.elapsed = 0;
		state.position.yield.percentage = 0;
		state.position.yield.apr = 0;
		state.position.value.liquidity = 0;
		state.position.value.fees = 0;
		dom.sync(state);
		console.warn("No position id found");
		return;
	}

	const deposit = get.depositFromCache(state, positionId);
	// if (deposit === void 0 || deposit.source === void 0 || deposit.source === "user") {
	if (deposit?.source !== "theGraph") {
		verifyDepositTime(state, positionId);
	}
	// }

	if (!deposit) {
		throw new Error("No deposit time found.");
	} else {
		return deposit;
	}
}

function verifyDepositTime(state: State, positionId: number) {
	return get
		.depositTimeFromSubgraph(positionId)
		.then((subgraphResponse) => {
			if (subgraphResponse) {
				const verifiedDepositTime = parse.dateFromTheGraph(subgraphResponse);
				console.trace(verifiedDepositTime);
				if (verifiedDepositTime) {
					// update the state with the new deposit time
					const deposit = {
						time: verifiedDepositTime,
						source: "theGraph",
						stats: state.deposits[positionId].stats || [],
					} as Deposit;
					console.trace(deposit);
					state.deposits[positionId] = deposit;
					return deposit;
				} else {
					throw new Error("No deposit time found.");
				}
			}
		})
		.catch((err) => {
			console.error(err);
			const userInputDeposit = get.depositFromUserInput();
			if (userInputDeposit) {
				state.deposits[positionId] = userInputDeposit as Deposit;
				return state.deposits[positionId];
			} else {
				throw new Error("No deposit time found.");
			}
		})
		.finally(() => {
			// console.trace(state.deposits);
			store.write("APR", state);
			main(state);
		});
}
