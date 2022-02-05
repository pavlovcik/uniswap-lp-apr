import { calculateTimings } from "../utils/calculate-timings";
import { calculateYield } from "../utils/calculate-yield";
import { getPositionIdFromUrl, readLocalStorage, setupDomNode } from "../utils/common";
import { getPositionValue } from "../utils/get-position-value";

export class State {
	storage = readLocalStorage();
	domNode = setupDomNode();
	observerAttached = false as boolean;
	position = {
		id: getPositionIdFromUrl(),
		value: getPositionValue(),
		time: { deposit: -1, elapsed: -1 } as PositionTiming,
		yield: { apr: -1, percentage: -1 } as PositionYield,
	};

	constructor(depositTime?: SerializedTimestamp) {
		if (depositTime) {
			this.position.time = calculateTimings(depositTime);
			this.position.yield = calculateYield(calculateTimings(depositTime).elapsed);
		}
	}
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
