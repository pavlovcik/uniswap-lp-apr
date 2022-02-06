import { PositionValue } from "../../State";

export function getPositionValue(): PositionValue {
	const root = document.getElementById(`root`);
	if (!root) {
		throw new Error(`No root element found`);
	}
	const CAPTURED = root.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
	if (!CAPTURED) {
		throw new Error("No relevant data on DOM found");
	} else {
		console.log(CAPTURED);
	}
	const liquidity = parser(CAPTURED, 0);
	const fees = parser(CAPTURED, 1);
	return { liquidity, fees };

	function parser(CAPTURED: string[], id: number) {
		try {
			return parseFloat(CAPTURED[id].replace(",", "").slice(1)); // remove $ and commas
		} catch (err) {
			console.error(err);
			return 0;
		}
	}
}
