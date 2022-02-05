import { dom } from "../utils/dom";
import { get } from "../utils/get";
import { store } from "../utils/store";

export class State {
	storage = store.read();
	domNode = dom.setupDomNode();
	observerAttached = false;
	position = {
		id: get.positionIdFromUrl(),
		value: get.positionValue(),
		time: { deposit: -1, elapsed: -1 } as PositionTiming,
		yield: { apr: -1, percentage: -1 } as PositionYield,
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
