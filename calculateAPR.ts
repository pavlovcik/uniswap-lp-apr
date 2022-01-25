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

function setupDomNode() {
	const node = document.createElement("div");
	node.style.cssText = `
position: fixed;
top: 0;
z-index: 2;
padding: 8px;
background: rgb(33, 36, 41);
border-radius: 16px;
margin: 16px;
border: 2px solid rgb(25, 27, 31);
font-weight: 500;
`;
	document.body.append(node);
	return node;
}

function readLocalStorage() {
	try {
		const apr = localStorage.getItem("APR");
		if (apr) {
			return JSON.parse(apr);
		} else {
			throw new Error("No APR found");
		}
	} catch (e) {
		return initializeLocalStorage();
	}
}

function initializeLocalStorage() {
	localStorage.setItem("APR", "{}");
	return {};
}

function getPositionIdFromUrl() {
	const lastNumbersInUrl = window.location.href.match(/\d+$/gim);
	if (!lastNumbersInUrl) {
		throw new Error("No position id found in url");
	}
	return lastNumbersInUrl[0];
}

function writeLocalStorage() {
	localStorage.setItem("APR", JSON.stringify(state.storage));
}

function attachMutationObserver() {
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === "childList") {
				console.log("dom mutation detected");
				const newCaptured = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
				if (!newCaptured) {
					throw new Error("No new captured found");
				}
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

function updateDomNode(string: string) {
	state.domNode.innerText = string;
}
