import { MS_IN_YEAR } from ".";
import { PositionYield, State } from "../../State";
import { getPositionValue } from "../get";

export function calculateYield(state: State, timeElapsed: number): PositionYield {
	// let fees, liquidity;
	// try {
	const { fees, liquidity } = getPositionValue();
	// } catch (error) {

	// }
	const percentYield = fees / liquidity;
	const projectedAPR = percentYield / (timeElapsed / MS_IN_YEAR);

	const positionYield = {
		apr: projectedAPR, // "return on investment, extrapolated to a year"
		percentage: percentYield, // "return on investment, as of right now"
	};

	return positionYield;
}
