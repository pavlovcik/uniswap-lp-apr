type SerializedTimestamp = number | string; // timestamp or deposit time

export type PositionTiming = {
	deposit: string | number | Date;
	elapsed: number;
};

export type PositionYield = {
	apr: number;
	percentage: number;
};

export type PositionWorth = {
	liquidity: number;
	fees: number;
};
export interface AppState {
	storage: Record<string, SerializedTimestamp>;
	domNode: HTMLDivElement;
	observerAttached: boolean;
	position: {
		id: string;
		worth: PositionWorth;
		time: PositionTiming;
		yield: PositionYield;
	};
}

export type TimestampQueryResponse = {
	data: { positions: [{ transaction: { timestamp: "1639349303" } }] };
};
