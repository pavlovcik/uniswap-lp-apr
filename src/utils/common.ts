import { AppState } from "./types";
import { appState } from ".";
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

export function setupDomNode() {
	const node = document.createElement("div");
	node.style.cssText = CSS_TEXT;
	document.body.append(node);
	return node;
}

export function readLocalStorage() {
	try {
		const apr = localStorage.getItem("APR");
		if (apr) {
			return JSON.parse(apr);
		} else {
			throw new Error("No APR found");
		}
	} catch (e) {
		return initializeLocalStorage();
	}
}

export function initializeLocalStorage() {
	localStorage.setItem("APR", "{}");
	return {};
}

export function getPositionIdFromUrl() {
	const lastNumbersInUrl = window.location.href.match(/\d+/gim);
	if (!lastNumbersInUrl) {
		throw new Error("No position id found in url");
	}
	return lastNumbersInUrl[0];
}

export function writeLocalStorage() {
	localStorage.setItem("APR", JSON.stringify(appState.storage));
}

export function updateDomNode(state: AppState) {
	// if (!appState.position.yield.apr) {
	// 	throw new Error("No projected APR data found in state");
	// }

	// if (!appState.position.worth.liquidity) {
	// 	throw new Error("No liquidity data found in state");
	// }

	return (state.domNode.innerText = `${state.position.yield.apr} · APR\n$${(
		(state.position.yield.apr / 365) *
		state.position.worth.liquidity
	).toFixed(2)} · Daily\n$${(state.position.yield.apr * state.position.worth.liquidity).toFixed(2)} · Annual`);
}

export function syncStatePositionAndDom(positionState) {
	return updateDomNode(Object.assign(appState.position, positionState));
}

// export function updateDomNodeString(string: string) {
// 	appState.domNode.innerText = string;
// }
