import { PositionYield } from "../../State";
import { get } from "../get";
import { MS_IN_YEAR } from ".";

export function calculateYield(timeElapsed: number): PositionYield {
	const { fees, liquidity } = get.positionValue();
	const percentYield = fees / liquidity;
	const projectedAPR = percentYield / (timeElapsed / MS_IN_YEAR);

	const positionYield = {
		apr: projectedAPR,
		percentage: percentYield,
	};

	return positionYield;
}
