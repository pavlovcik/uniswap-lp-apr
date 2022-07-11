import * as Plot from "@observablehq/plot";
import { State } from "../../State";

export function charting(state: State) {
	const analytics = state.deposits[state.position.id].analytics;
	const parent = document.body;

	if (state.plot) {
		parent.removeChild(state.plot);
	}
	const plotSvg = Plot.plot({
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
			type: "time",
			// sort: "timestamp",
		},
	});
	const div = document.createElement(`div`);
	div.id = "uniswap-apr-plotter";
	div.appendChild(plotSvg);
	state.plot = div;
	parent.append(div);
}
