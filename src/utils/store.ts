export const store = {
	write: writeLocalStorage,
	read: readLocalStorage,
	initialize: initializeLocalStorage,
};

function writeLocalStorage(key: string, value: unknown) {
	localStorage.setItem(key, JSON.stringify(value));
}

function readLocalStorage(key: string) {
	try {
		const value = localStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		} else {
			console.error(`No ${key} found`);
		}
	} catch (e) {
		console.error(e);
	}
	return null;
}

function initializeLocalStorage(key: string, value: unknown) {
	const stored = readLocalStorage(key);
	if (stored) {
		return stored;
	} else {
		writeLocalStorage(key, value);
		return value;
	}
}
