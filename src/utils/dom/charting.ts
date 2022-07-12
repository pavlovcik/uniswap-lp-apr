import * as Plot from "@observablehq/plot";
import { State } from "../../State";

export function charting(state: State) {
	const analytics = state.deposits[state.position.id].analytics;
	const parent = document.body;

	if (state.plot) {
		parent.removeChild(state.plot);
	}

	const dot = { x: "elapsed", y: "apr", r: 1, strokeOpacity: 0.5 };
	const line = { x: "elapsed", y: "apr", strokeOpacity: 0.25 };

	const plotSvg = Plot.plot({
		grid: true,
		marks: [
			Plot.dot(analytics, dot),
			Plot.line(analytics, line),
			// Plot.areaY(analytics, {
			// 	x: "elapsed",
			// 	y: "liquidity",
			// 	// order: "liquidity",
			// 	// fill: "brand",
			// 	fillOpacity: 0.5,
			// 	curve: "step",
			// }),
		],
		y: {
			percent: true,
			axis: "right",
		},
		x: {
			type: "time",
			axis: "top",
			transform: function bumpForwardSixHours(timestamp: string) {
				// I have no idea why the times are behind by six hours,
				// so here is a dirty fix
				const date = new Date(timestamp);
				const numOfHours = 6;
				date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
				return date.getTime();
			},
		},
	});
	const div = document.createElement(`div`);
	div.id = "uniswap-apr-plotter";
	div.appendChild(plotSvg);
	state.plot = div;
	parent.append(div);
}
