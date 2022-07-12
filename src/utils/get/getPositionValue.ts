import { PositionValue } from "../../State";

export function getLiquidityAndFeesFromDom(): PositionValue {
	const root = document.getElementById(`root`);
	if (!root) {
		throw new Error(`No root element found`);
	}
	const relevantData = root.innerText.match(/^\$\d+(,\d+)*(.\d+)+/gim);
	if (!relevantData) {
		console.warn("No relevant data on DOM found");
		return { liquidity: 0, fees: 0 };
	}

	const liquidity = parser(relevantData, 0);
	if (!liquidity) {
		throw new Error("No liquidity found, can not calculate performance!");
	}

	const fees = parser(relevantData, 1);
	if (!fees) {
		throw new Error("No fees generated found, can not calculate performance!");
	}

	return { liquidity, fees };

	function parser(CAPTURED: string[], id: number) {
		try {
			const float = CAPTURED[id].replace(",", "").slice(1);
			return parseFloat(float); // remove $ and commas
		} catch (err) {
			return 0;
		}
	}
}
