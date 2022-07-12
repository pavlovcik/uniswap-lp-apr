import { attachMutationObserver } from "./utils/dom";
import { setupHudNode, setupPlotNode } from "./utils/dom/setupDomNode";
import { Deposit } from "./utils/get/getDepositFromCache";
import { getPositionIdFromUrl } from "./utils/get/getPositionIdFromUrl";
import { getLiquidityAndFeesFromDom } from "./utils/get/getPositionValue";
import { store } from "./utils/store";
export class State {
	position: StatePosition;
	deposits: Deposits;
	observer: MutationObserver;
	dom: {
		hud: HTMLDivElement;
		plot: HTMLDivElement;
	};

	constructor() {
		this.dom = {
			hud: setupHudNode(),
			plot: setupPlotNode(),
		};

		this.position = {
			id: ignoreError(getPositionIdFromUrl),
			value: ignoreError(getLiquidityAndFeesFromDom),
			time: { deposit: 0, elapsed: 0 },
			yield: { apr: 0, percentage: 0 },
			precision: store.initialize("PRECISION", 2),
		} as StatePosition;

		this.deposits = store.initialize("DEPOSITS", {});
		this.observer = attachMutationObserver(this);
	}
}

function ignoreError(callback) {
	try {
		return callback();
	} catch (error) {
		return 0;
	}
}
export interface Deposits {
	[id: number]: Deposit;
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
