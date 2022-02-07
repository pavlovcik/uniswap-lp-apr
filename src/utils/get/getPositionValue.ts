import { PositionValue } from "../../State";

export function getPositionValue(): PositionValue {
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
	const fees = parser(relevantData, 1);

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
