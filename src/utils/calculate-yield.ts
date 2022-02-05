import { PositionYield } from "../setup/State";
import { getPositionValue } from "./get-position-value";

const MS_IN_YEAR = 31536000000;

export function calculateYield(timeElapsed: number): PositionYield {
	const { fees, liquidity } = getPositionValue();
	const percentYield = fees / liquidity;
	const projectedAPR = percentYield / (timeElapsed / MS_IN_YEAR);

	return {
		apr: projectedAPR,
		percentage: percentYield,
	};
}
