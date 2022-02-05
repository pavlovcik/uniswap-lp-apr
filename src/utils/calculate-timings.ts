import { getPositionIdFromUrl } from "./common";
import { state, MS_IN_YEAR } from "./main";
import { TimestampQueryResponse } from "./render-ui";

export function calculateTimings(timestamp?: TimestampQueryResponse) {
	state.positionId = getPositionIdFromUrl();
	let depositTime = state.storage[state.positionId];

	if (depositTime) {
		// Load from localStorage
		// Always check URL in case the user has changed the position ID.
	} else if (timestamp) {
		// Load from blockchain
		try {
			// Need to concat triple zero to timestamp
			// e.g.
			// 1639349303 = 1970-01-19T23:22:29.303Z
			// 1639349303000 = 2021-12-12T22:48:23.000Z
			const ts = parseInt(timestamp.data.positions[0].transaction.timestamp.concat(`000`));
			depositTime = depositTime = ts;
		} catch (err) {
			// User manual input
			console.error(err);
			depositTime = depositTime = prompt("Paste the deposit time here");
		}
	} else {
		throw new Error("No deposit time found.");
	}

	const NOW = new Date();
	const DEPOSIT_TIME_LOCAL = new Date(depositTime);

	const TIMEZONE_OFFSET = DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
	state.depositTime = new Date(DEPOSIT_TIME_LOCAL.getTime() - TIMEZONE_OFFSET);
	state.timeElapsed = NOW.getTime() - state.depositTime.getTime();
	state.projectedAPR = state.percentYield / (state.timeElapsed / MS_IN_YEAR);
}
