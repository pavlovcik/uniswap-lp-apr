import { MS_IN_YEAR, state } from "../calculate-apr";
import { updateDomNode } from "./common";

export function attachMutationObserver() {
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === "childList") {
				console.log("dom mutation detected");
				const newCaptured = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
				if (!newCaptured) {
					throw new Error("No new captured found");
				}
				state.liquidity = parseFloat(newCaptured[0].replace(",", "").slice(1));
				state.fees = parseFloat(newCaptured[1].replace(",", "").slice(1));
				state.percentYield = state.fees / state.liquidity;
				state.timeElapsed = new Date().getTime() - state.depositTime.getTime();
				state.projectedAPR = state.percentYield / (state.timeElapsed / MS_IN_YEAR);
				console.log(state.projectedAPR);
				console.log(state);
				updateDomNode(
					`${state.projectedAPR} · APR\n$${((state.projectedAPR / 365) * state.liquidity).toFixed(2)} · Daily\n$${(
						state.projectedAPR * state.liquidity
					).toFixed(2)} · Annual`
				);
			}
		});
	});

	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});
}
