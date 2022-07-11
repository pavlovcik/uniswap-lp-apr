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
	const parent = state.domNode.parentElement;
	if (state.plot) {
		parent?.removeChild(state.plot);
	}
	state.plot = Plot.plot({
		style: {
			background: "black",
			color: "white",
		},
		y: {
			grid: true,
			// transform: (apr: PositionYield["apr"]) => (apr * 100).toString().concat("%"),
		},

		x: {
			grid: true,
			// label: "",
			// label: "↑ Temperature (°F)",
			// transform: (timestamp: PositionTiming["elapsed"]) => new Date(timestamp).toString(),
		},

		marks: [Plot.line(analytics, { x: "elapsed", y: "apr" })],
	});
	parent?.append(state.plot);
	main(state);
}
