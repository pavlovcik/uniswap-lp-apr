import { dom } from "./utils/dom";
import { get } from "./utils/get";
import { store } from "./utils/store";

const ignoreError = (callback) => {
	try {
		return callback();
	} catch (error) {
		return 0;
	}
};
export class State {
	storage = store.read();
	domNode = dom.setupDomNode();
	observerAttached = false;
	position = {
		id: ignoreError(get.positionIdFromUrl),
		value: ignoreError(get.positionValue),
		time: { deposit: 0, elapsed: 0 } as PositionTiming,
		yield: { apr: 0, percentage: 0 } as PositionYield,
	};
}

export type SerializedTimestamp = string | number; // timestamp or deposit time

export type PositionTiming = {
	deposit: SerializedTimestamp;
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
};

export type StateStorage = Record<string, SerializedTimestamp>;
