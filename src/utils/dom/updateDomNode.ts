import { State } from "../../State";
import { ProjectedEarnings } from "./ProjectedEarnings";

const daysInYear = 365.25;
const hoursInYear = 8760;
const minutesInYear = 525600;
const secondsInYear = 31557600;

export function updateHudNode(state: State) {
	const node = state.dom.hud;
	const apr = state.position.yield.apr;
	const liquidity = state.position.value.liquidity;

	const earnings = new ProjectedEarnings(apr, liquidity, state.position.precision);

	const yearly = earnings.by(1);
	const daily = earnings.by(daysInYear);
	const hourly = earnings.by(hoursInYear);
	const minutely = earnings.by(minutesInYear);
	const secondly = earnings.by(secondsInYear);

	if (!node) {
		throw new Error("No dom node found.");
	}

	let buffer = "";

	if (apr) {
		buffer = buffer.concat(`<ul>`);
		buffer = buffer.concat(`<li>${(apr * 100).toFixed(4)}% · APR</li>`);
		if (liquidity) {
			buffer = buffer.concat(`<li>$${yearly.formatted} · Yearly</li>`);
			buffer = buffer.concat(`<li>$${daily.formatted} · Daily</li>`);
			buffer = buffer.concat(`<li>$${hourly.formatted} · Hourly</li>`);
			buffer = buffer.concat(`<li>$${minutely.formatted} · Minutely</li>`);
			buffer = buffer.concat(`<li>$${secondly.formatted} · Secondly</li>`);
		}
		buffer = buffer.concat(`</ul>`);
		buffer = buffer.concat(
			`<p><a href="https://revert.ubq.fi/#/uniswap-position/mainnet/${state.position.id}">see more details</a></p>`
		);
	}

	if (buffer.length) {
		node.className = "active";
	} else {
		node.className = "";
	}

	node.innerHTML = buffer;
	return buffer;
}
