import { calculateTimings } from "./calculate-timings";
import { updateDomNode, writeLocalStorage } from "./common";
import { state } from "./main";
import { readDomData } from "./read-dom-data";

export type TimestampQueryResponse = {
	data: { positions: [{ transaction: { timestamp: "1639349303" } }] };
};

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
		state.storage[state.positionId] = newDepositTime;
		writeLocalStorage();
	}

	return timestamp;
}
