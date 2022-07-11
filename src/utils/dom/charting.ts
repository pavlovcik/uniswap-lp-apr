import * as Plot from "@observablehq/plot";
import { State } from "../../State";

export function charting(state: State) {
	const analytics = state.deposits[state.position.id].analytics;
	const parent = document.body;
	if (state.plot) {
		parent?.removeChild(state.plot);
	}
	state.plot = Plot.plot({
		grid: true,
		marks: [
			Plot.dot(analytics, {
				x: "elapsed",
				y: "apr",
				r: 1,
				strokeOpacity: 0.5,
			}),
			Plot.line(analytics, {
				x: "elapsed",
				y: "apr",
				strokeOpacity: 0.25,
			}),
		],
		y: {
			percent: true,
		},
		x: {
			type: "utc",
			sort: "timestamp",
		},
	});
	parent?.append(state.plot);
}
