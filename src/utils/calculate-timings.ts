import { appState } from ".";
import { getPositionIdFromUrl } from "./common";
import { PositionTiming, TimestampQueryResponse } from "./types";

export function calculateTimings(_timestamp?: TimestampQueryResponse): PositionTiming {
	let cachedDepositTime = appState.storage[getPositionIdFromUrl()];

	if (_timestamp) {
		// Load from blockchain
		cachedDepositTime = parseDateFromTheGraph(_timestamp);
	} else {
		cachedDepositTime = parseDateFromUserInput(prompt("Paste the deposit time here"));
	}

	if (!cachedDepositTime) {
		throw new Error("No deposit time found.");
	}

	const NOW = new Date();
	const DEPOSIT_TIME_LOCAL = new Date(cachedDepositTime);

	const TIMEZONE_OFFSET = DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
	const depositTime = new Date(DEPOSIT_TIME_LOCAL.getTime() - TIMEZONE_OFFSET);
	const timeElapsed = NOW.getTime() - depositTime.getTime();

	return {
		deposit: depositTime,
		elapsed: timeElapsed,
	};
}
function parseDateFromUserInput(userInput) {
	let depositTime;
	if (userInput) {
		try {
			const userInputDate = new Date(userInput);
			depositTime = userInputDate;
		} catch (error) {
			console.error(error);
		}
	}
	return depositTime;
}

function parseDateFromTheGraph(_timestamp: TimestampQueryResponse) {
	let depositTime;
	try {
		depositTime = parseInt(_timestamp.data.positions[0].transaction.timestamp.concat(`000`));
	} catch (err) {
		// User manual input
		console.error(err);
	}
	return depositTime;
}
