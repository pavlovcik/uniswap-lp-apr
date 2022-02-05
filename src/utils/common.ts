import type { SerializedTimestamp, State, StatePosition } from "../setup/State";
import { TimestampQueryResponse } from "./@types";

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
	return parseInt(lastNumbersInUrl[0]);
}

export function writeLocalStorage(state: State) {
	localStorage.setItem("APR", JSON.stringify(state.storage));
}

export function updateDomNode(state: State) {
	return (state.domNode.innerText = `${state.position.yield.apr} · APR\n$${(
		(state.position.yield.apr / 365) *
		state.position.value.liquidity
	).toFixed(2)} · Daily\n$${(state.position.yield.apr * state.position.value.liquidity).toFixed(2)} · Annual`);
}

export function syncStatePositionAndDom(state: State, positionState: StatePosition) {
	const merged = Object.assign(state, { position: positionState });
	return updateDomNode(merged);
}

// export function updateDomNodeString(string: string) {
// 	appState.domNode.innerText = string;
// }

export function parseDateFromUserInput(userInput: string): SerializedTimestamp {
	const userInputDate = new Date(userInput);
	const depositTime = userInputDate.getTime();
	return depositTime;
}

export function parseDateFromTheGraph(timestamp: TimestampQueryResponse): SerializedTimestamp {
	const depositTime = parseInt(timestamp.data.positions[0].transaction.timestamp.concat(`000`));
	return depositTime;
}
