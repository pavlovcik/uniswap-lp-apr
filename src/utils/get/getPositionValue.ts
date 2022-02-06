import { PositionValue } from "../../State";

export function getPositionValue(): PositionValue {
	const root = document.getElementById(`root`);
	if (!root) {
		throw new Error(`No root element found`);
	}
	const CAPTURED = root.innerText.match(/^\$\d+(,\d+)*(.\d+)+/gim);
	if (!CAPTURED) {
		throw new Error("No relevant data on DOM found");
	}
	const liquidity = parser(CAPTURED, 0);
	const fees = parser(CAPTURED, 1);

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
