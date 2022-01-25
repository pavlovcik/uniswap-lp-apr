import { attachMutationObserver } from "./utils";
import { getPositionIdFromUrl, readLocalStorage, setupDomNode, updateDomNode, writeLocalStorage } from "./utils/common";

const state = {
	liquidity: undefined,
	fees: undefined,
	percentYield: undefined,
	depositTime: undefined,
	timeElapsed: undefined,
	projectedAPR: undefined,
	storage: readLocalStorage(),
	domNode: setupDomNode(),
} as any;

const CAPTURED = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
if (!CAPTURED) {
	throw new Error("No captured found");
}

state.liquidity = parseFloat(CAPTURED[0].replace(",", "").slice(1));
state.fees = parseFloat(CAPTURED[1].replace(",", "").slice(1));
state.percentYield = state.fees / state.liquidity;

const POSITION_ID = getPositionIdFromUrl();

let depositTime;
if (state.storage[POSITION_ID]) {
	depositTime = state.storage[POSITION_ID];
} else {
	state.storage[POSITION_ID] = depositTime = prompt("Paste the deposit time here");
}

const MS_IN_YEAR = 31536000000;
const NOW = new Date();
const DEPOSIT_TIME_LOCAL = new Date(depositTime);

const TIMEZONE_OFFSET = DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
state.depositTime = new Date(DEPOSIT_TIME_LOCAL.getTime() - TIMEZONE_OFFSET);
state.timeElapsed = NOW.getTime() - state.depositTime.getTime();
state.projectedAPR = state.percentYield / (state.timeElapsed / MS_IN_YEAR);

console.log(state);
updateDomNode(
	`${state.projectedAPR} · APR\n$${((state.projectedAPR / 365) * state.liquidity).toFixed(2)} · Daily\n$${(state.projectedAPR * state.liquidity).toFixed(
		2
	)} · Annual`
);

const newDepositTime = prompt(`APR: ${state.projectedAPR}\nPaste in a new deposit time to update.`);

if (newDepositTime) {
	state.storage[POSITION_ID] = newDepositTime;
	writeLocalStorage();
}

attachMutationObserver();
