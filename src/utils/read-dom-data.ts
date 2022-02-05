import { state } from "./main";

export function readDomData() {
	const CAPTURED = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
	if (!CAPTURED) {
		throw new Error("No relevant data on DOM found");
	}
	state.liquidity = parser(CAPTURED, 0);
	state.fees = parser(CAPTURED, 1);
	state.percentYield = state.fees / state.liquidity;
}

function parser(CAPTURED: string[], id: number) {
	try {
		return parseFloat(CAPTURED[id].replace(",", "").slice(1));
	} catch (err) {
		// console.log(arguments);
		// debugger;
		// console.warn(err);
	}
}
