import { State } from "../State";

export const store = {
	write: writeLocalStorage,
	read: readLocalStorage,
	initialize: initializeLocalStorage,
};

function writeLocalStorage(state: State) {
	console.log("Writing to local storage");
	localStorage.setItem("APR", JSON.stringify(state.storage));
}
function readLocalStorage() {
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

function initializeLocalStorage() {
	localStorage.setItem("APR", "{}");
	return {};
}
