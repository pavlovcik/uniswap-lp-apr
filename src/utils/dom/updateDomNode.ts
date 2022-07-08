import { State } from "../../State";
import { ProjectedEarnings } from "./ProjectedEarnings";

const daysInYear = 365.25;
const hoursInYear = 8760;
const minutesInYear = 525600;
const secondsInYear = 31557600;

export function updateDomNode(state: State) {
	const node = state.domNode;
	const apr = state.position.yield.apr;
	const liquidity = state.position.value.liquidity;

	const earnings = new ProjectedEarnings(apr, liquidity);

	const yearly = earnings.by(1);
	const daily = earnings.by(daysInYear);
	const hourly = earnings.by(hoursInYear);
	const minutely = earnings.by(minutesInYear);
	const secondly = earnings.by(secondsInYear);

	if (!node) {
		throw new Error("No dom node found.");
	}

	const buffer = [] as string[];

	if (apr) {
		buffer.push(`${(apr * 100).toFixed(4)}% · APR`);
		if (liquidity) {
			buffer.push(`$${yearly.formatted} · Yearly`);
			buffer.push(`$${daily.formatted} · Daily`);
			buffer.push(`$${hourly.formatted} · Hourly`);
			buffer.push(`$${minutely.formatted} · Minutely`);
			buffer.push(`$${secondly.formatted} · Secondly`);
		}
	}

	if (buffer.length) {
		node.className = "active";
	} else {
		node.className = "";
	}

	return (node.innerText = buffer.join(`\n`)); // line breaks
}
