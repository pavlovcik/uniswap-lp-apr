import { calculateTimings } from "./calculate-timings";
import { updateDomNode } from "./common";
import { state } from "./main";
import { readDomData } from "./read-dom-data";
import { TimestampQueryResponse } from "./render-ui";

export function attachMutationObserver(timestamp: TimestampQueryResponse) {
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
			// console.log(JSON.stringify(state, null, "\t"));
			console.log(state);
			// if (state.positionId != getPositionIdFromUrl()) {
			// 	state.positionId = getPositionIdFromUrl();
			// 	state.storage = readDomData();
			// }

			readDomData();
			calculateTimings();
			updateDomNode(
				`${state.projectedAPR} · APR\n$${((state.projectedAPR / 365) * state.liquidity).toFixed(2)} · Daily\n$${(
					state.projectedAPR * state.liquidity
				).toFixed(2)} · Annual`
			);
		}
	}
}
