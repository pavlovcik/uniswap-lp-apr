import { dom } from "./utils/dom";
import { get } from "./utils/get";
import { Deposit } from "./utils/get/getDepositFromCache";
import { store } from "./utils/store";

const ignoreError = (callback) => {
	try {
		return callback();
	} catch (error) {
		return 0;
	}
};
export interface Deposits {
	[id: string]: Deposit;
}
export class State {
	deposits = store.initialize("DEPOSITS", {}) as Deposits;
	domNode = dom.setupDomNode();
	observerAttached = false;
	position = {
		id: ignoreError(get.positionIdFromUrl),
		value: ignoreError(get.positionValue),
		time: { deposit: 0, elapsed: 0 },
		yield: { apr: 0, percentage: 0 },
		precision: store.initialize("PRECISION", 2),
	} as StatePosition;
	depositPrompted = false;
}

export type PositionTiming = {
	deposit: number;
	elapsed: number;
};

export type PositionYield = {
	apr: number;
	percentage: number;
};

export type PositionValue = {
	liquidity: number;
	fees: number;
};

export type StatePosition = {
	id: number;
	value: PositionValue;
	time: PositionTiming;
	yield: PositionYield;
	precision: number;
};

export type StateStorage = Record<string, number>;
