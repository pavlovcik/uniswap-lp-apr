import { state } from "./calculate-apr";

export function readDomData() {
    const CAPTURED = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
    if (!CAPTURED) {
        throw new Error("No captured found");
    }
    state.liquidity = parseFloat(CAPTURED[0].replace(",", "").slice(1));
    state.fees = parseFloat(CAPTURED[1].replace(",", "").slice(1));
    state.percentYield = state.fees / state.liquidity;
}
