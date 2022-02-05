import { PositionValue, SerializedTimestamp, State } from "../setup/State";
import { network } from "./network";
import { parse } from "./parse";
import { store } from "./store";

export const get = {
	depositTime: getDepositTime,
	positionIdFromUrl: getPositionIdFromUrl,
	depositTimeFromCache: getDepositTimeFromCache,
	positionValue: getPositionValue,
};

function getPositionValue(): PositionValue {
	const root = document.getElementById(`root`);
	if (!root) {
		throw new Error(`No root element found`);
	}

	const CAPTURED = root.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
	if (!CAPTURED) {
		throw new Error("No relevant data on DOM found");
	} else {
		console.log(CAPTURED);
	}

	const liquidity = parser(CAPTURED, 0);
	const fees = parser(CAPTURED, 1);
	// const percentYield = fees / liquidity;

	return { liquidity, fees };
}

function parser(CAPTURED: string[], id: number) {
	return parseFloat(CAPTURED[id].replace(",", "").slice(1)); // remove $ and commas
}

function getDepositTimeFromCache(state: State): SerializedTimestamp | undefined {
	const depositTime = state.storage[getPositionIdFromUrl()];
	// if (!depositTime) {
	// 	throw new Error("No deposit time found.");
	// }
	return depositTime;
}

async function getDepositTime(state: State) {
	let depositTime;
	// get from cache
	depositTime = getDepositTimeFromCache(state);
	// get from blockchain
	if (!depositTime) {
		depositTime = await network.queryTimestampFromBlockchain(getPositionIdFromUrl());
		depositTime = parse.dateFromTheGraph(depositTime);
	}
	if (!depositTime) {
		// get from user manual input
		const userInput = prompt("Paste the deposit time here");
		if (userInput) {
			depositTime = parse.dateFromUserInput(userInput);
		}
	}

	if (!depositTime) {
		throw new Error("No deposit time found.");
	} else {
		// save once deposit time found
		state.storage[state.position.id] = depositTime;
		store.write(state);
		return depositTime;
	}
}

function getPositionIdFromUrl() {
	const lastNumbersInUrl = window.location.href.match(/\d+/gim);
	if (!lastNumbersInUrl) {
		throw new Error("No position id found in url");
	}
	return parseInt(lastNumbersInUrl[0]);
}
