import * as Plot from "@observablehq/plot";
import { main } from "..";
import { State } from "../../State";

export function attachMutationObserver(state: State) {
	if (state.observer) {
		throw new Error("Mutation observer already attached.");
	}

	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));
	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});

	function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			programLoop(state);
		}
	}
	state.observer = observer;
}

function programLoop(state: State) {
	const analytics = state.deposits[state.position.id].analytics;
	const parent = document.body;
	if (state.plot) {
		parent?.removeChild(state.plot);
	}
	state.plot = Plot.plot({
		grid: true,
		style: {},
		marks: [
			Plot.line(analytics, {
				x: "elapsed",
				y: "apr",
			}),
		],
		y: {
			percent: true,
		},
		x: {
			type: "time",
			sort: "timestamp",
		},
	});
	parent?.append(state.plot);
	main(state);
}
