import { MS_IN_YEAR, state } from "../calculate-apr";
import { TimestampQueryResponse } from "../callback";
import { calculateTimings } from "./calculate-timings";
import { updateDomNode } from "./common";
import { readDomData } from "./read-dom-data";

export function attachMutationObserver(timestamp: TimestampQueryResponse) {
	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));

	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});

	function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			console.log("dom mutation detected");
			readDomData();
			calculateTimings(timestamp);
			updateDomNode(
				`${state.projectedAPR} · APR\n$${((state.projectedAPR / 365) * state.liquidity).toFixed(2)} · Daily\n$${(state.projectedAPR * state.liquidity).toFixed(
					2
				)} · Annual`
			);
		}
	}
}
