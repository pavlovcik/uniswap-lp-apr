import { State } from "../../State";

export function updateDomNode(state: State) {
	const node = state.domNode;
	const apr = state.position.yield.apr;
	const liquidity = state.position.value.liquidity;
	const annual = apr * liquidity;
	const daily = ((apr / 365) * liquidity).toFixed(2);

	if (!node) {
		throw new Error("No dom node found.");
	}

	const buffer = [] as string[];

	if (apr) buffer.push(`${apr} · APR`);
	if (apr && liquidity) buffer.push(`$${daily} · Daily`);
	if (apr && liquidity) buffer.push(`$${annual.toFixed(2)} · Annual`);

	if (buffer.length) {
		node.className = "active";
	} else {
		node.className = "";
	}

	return (node.innerText = buffer.join(`\n`)); // line breaks
}
