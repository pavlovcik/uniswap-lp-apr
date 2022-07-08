export class ProjectedEarnings {
	static apr: number;
	static liquidity: number;
	static precision = 2;

	constructor(apr: number, liquidity: number, precision?: number) {
		ProjectedEarnings.apr = apr;
		ProjectedEarnings.liquidity = liquidity;
		if (precision) {
			ProjectedEarnings.precision = precision;
		}
	}

	public by = (divisor: number) => {
		const value = (ProjectedEarnings.apr / divisor) * ProjectedEarnings.liquidity;
		return {
			value,
			formatted: value.toFixed(ProjectedEarnings.precision),
		};
	};
}
