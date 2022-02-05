import { MS_IN_YEAR } from ".";
import { scrapePositionWorth } from "./scrape-position-worth";
import { PositionYield } from "./types";

export function calculateYield(timeElapsed): PositionYield {
	const { fees, liquidity } = scrapePositionWorth();
	const percentYield = fees / liquidity;
	const projectedAPR = percentYield / (timeElapsed / MS_IN_YEAR);

	return {
		apr: projectedAPR,
		percentage: percentYield,
	};
}
