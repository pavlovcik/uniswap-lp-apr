export class ProjectedEarnings {
	static apr: number;
	static liquidity: number;
	static precision: number;

	constructor(apr: number, liquidity: number, precision: number) {
		ProjectedEarnings.apr = apr;
		ProjectedEarnings.liquidity = liquidity;
		ProjectedEarnings.precision = precision;
	}

	public by = (divisor: number) => {
		const value = (ProjectedEarnings.apr / divisor) * ProjectedEarnings.liquidity;
		return {
			value,
			formatted: value.toFixed(ProjectedEarnings.precision),
		};
	};
}
