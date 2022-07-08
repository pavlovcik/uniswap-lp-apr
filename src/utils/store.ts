import { State } from "../State";

export const store = {
	write: writeLocalStorage,
	read: readLocalStorage,
	initialize: initializeLocalStorage,
};

function writeLocalStorage(key: string, state: State) {
	localStorage.setItem(key, JSON.stringify(state.storage));
}

function readLocalStorage(key: string) {
	try {
		const value = localStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		} else {
			throw new Error(`No ${key} found`);
		}
	} catch (e) {
		return initializeLocalStorage(key);
	}
}

function initializeLocalStorage(key: string) {
	localStorage.setItem(key, "{}");
	return {};
}
