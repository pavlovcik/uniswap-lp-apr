import { PositionTiming, PositionYield, SerializedTimestamp } from "../setup/State";
import { get } from "./get";
const MS_IN_YEAR = 31536000000;

export const calculate = {
	timings: calculateTimings,
	yield: calculateYield,
};

export function calculateYield(timeElapsed: number): PositionYield {
	const { fees, liquidity } = get.positionValue();
	const percentYield = fees / liquidity;
	const projectedAPR = percentYield / (timeElapsed / MS_IN_YEAR);

	return {
		apr: projectedAPR,
		percentage: percentYield,
	};
}

function calculateTimings(depositTime: SerializedTimestamp): PositionTiming {
	const NOW = new Date();
	const DEPOSIT_TIME_LOCAL = new Date(depositTime);

	const TIMEZONE_OFFSET = DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
	const localizedDepositTime = new Date(DEPOSIT_TIME_LOCAL.getTime() - TIMEZONE_OFFSET);
	const timeElapsed = NOW.getTime() - localizedDepositTime.getTime();

	return {
		deposit: localizedDepositTime.getTime() as SerializedTimestamp, // serialize
		elapsed: timeElapsed,
	};
}
