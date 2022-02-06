import { calculateTimings } from "./calculateTimings";
import { calculateYield } from "./calculateYield";
export const MS_IN_YEAR = 31536000000;

export const calculate = {
	timings: calculateTimings,
	yield: calculateYield,
};
