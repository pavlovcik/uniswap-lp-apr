import { calculateTimings } from "./calculate-timings";
import { updateDomNode } from "./common";
import { appState } from ".";
import { scrapePositionWorth } from "./scrape-position-worth";
import { calculateYield } from "./calculate-yield";
import { PositionTiming, PositionYield } from "./types";

export function attachMutationObserver() {
	if (appState.observerAttached) {
		throw new Error("Mutation observer already attached.");
	}

	appState.observerAttached = true;

	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));

	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});

	function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			console.log(appState);
			scrapePositionWorth();
			const positionState = {} as { timings: PositionTiming; yields: PositionYield };
			positionState.timings = calculateTimings();
			positionState.yields = calculateYield(positionState.timings.elapsed);
			syncStatePositionAndDom(positionState);
		}
	}
}
