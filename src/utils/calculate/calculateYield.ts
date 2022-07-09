import { MS_IN_YEAR } from ".";
import { PositionYield } from "../../State";
import { get } from "../get";

export function calculateYield(timeElapsed: number): PositionYield {
	const { fees, liquidity } = get.positionValue();
	const percentYield = fees / liquidity;
	const projectedAPR = percentYield / (timeElapsed / MS_IN_YEAR);

	const positionYield = {
		apr: projectedAPR, // "return on investment, extrapolated to a year"
		percentage: percentYield, // "return on investment, as of right now"
	};

	return positionYield;
}
