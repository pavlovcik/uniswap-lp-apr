import { main } from ".";
import type { State, StatePosition } from "../setup/State";

export const dom = {
	setupDomNode,
	updateDomNode,
	syncStatePositionAndDom,
	attachMutationObserver,
};

const CSS_TEXT = `
position: fixed;
top: 0;
z-index: 2;
padding: 8px;
background: rgb(33, 36, 41);
border-radius: 16px;
margin: 16px;
border: 2px solid rgb(25, 27, 31);
font-weight: 500;
`;

function setupDomNode() {
	const node = document.createElement("div");
	node.id = "uniswap-apr";
	node.style.cssText = CSS_TEXT;
	document.body.append(node);
	return node;
}

function updateDomNode(state: State) {
	return (state.domNode.innerText = `${state.position.yield.apr} · APR\n$${(
		(state.position.yield.apr / 365) *
		state.position.value.liquidity
	).toFixed(2)} · Daily\n$${(state.position.yield.apr * state.position.value.liquidity).toFixed(2)} · Annual`);
}

function syncStatePositionAndDom(state: State, positionState: StatePosition) {
	console.log(state);
	const merged = Object.assign(state, { position: positionState });
	return updateDomNode(merged);
}

function attachMutationObserver(state: State) {
	if (state.observerAttached) {
		throw new Error("Mutation observer already attached.");
	}
	state.observerAttached = true;
	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));
	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});
	async function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			await main(state);
		}
	}
}
