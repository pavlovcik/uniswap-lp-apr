import { attachMutationObserver } from ".";
import { updateDomNode, writeLocalStorage } from "./common";
import { state, POSITION_ID } from "./main";
import { calculateTimings } from "./calculate-timings";
import { readDomData } from "./read-dom-data";

export type TimestampQueryResponse = { data: { positions: [{ transaction: { timestamp: "1639349303" } }] } };

export function renderUI(timestamp: TimestampQueryResponse) {
	readDomData();

	calculateTimings(timestamp);

	console.log(state);

	updateDomNode(
		`${state.projectedAPR} · APR\n$${((state.projectedAPR / 365) * state.liquidity).toFixed(2)} · Daily\n$${(state.projectedAPR * state.liquidity).toFixed(
			2
		)} · Annual`
	);

	const newDepositTime = prompt(`APR: ${state.projectedAPR}\nPaste in a new deposit time to update.`);

	if (newDepositTime) {
		state.storage[POSITION_ID] = newDepositTime;
		writeLocalStorage();
	}

	return timestamp;
}
