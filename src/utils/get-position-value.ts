import { PositionValue } from "../setup/State";

export function getPositionValue(): PositionValue {
	const CAPTURED = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
	if (!CAPTURED) {
		throw new Error("No relevant data on DOM found");
	}

	const liquidity = parser(CAPTURED, 0);
	const fees = parser(CAPTURED, 1);
	// const percentYield = fees / liquidity;

	return { liquidity, fees };
}

function parser(CAPTURED: string[], id: number) {
	return parseFloat(CAPTURED[id].replace(",", "").slice(1)); // remove $ and commas
}
