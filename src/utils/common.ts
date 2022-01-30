import { state } from "../calculate-apr";

export function setupDomNode() {
	const node = document.createElement("div");
	node.style.cssText = `
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
	localStorage.setItem("APR", JSON.stringify(state.storage));
}
export function updateDomNode(string: string) {
	state.domNode.innerText = string;
}
