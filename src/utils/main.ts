import { renderUI } from "./render-ui";
import { attachMutationObserver } from "./attach-mutation-observer";
import { getPositionIdFromUrl, readLocalStorage, setupDomNode } from "./common";
import { queryBlockchain } from "./query-blockchain";

export const MS_IN_YEAR = 31536000000;
export const state = {
	liquidity: undefined,
	fees: undefined,
	percentYield: undefined,
	depositTime: undefined,
	timeElapsed: undefined,
	projectedAPR: undefined,
	storage: readLocalStorage(),
	domNode: setupDomNode(),
	observerAttached: false,
} as any;

export const POSITION_ID = getPositionIdFromUrl();

const queryTimestamp = `{"query": "{positions(where: {id: ${POSITION_ID}}) {transaction {timestamp}}}"}`;

queryBlockchain(queryTimestamp)
	.then(renderUI)
	.then(attachMutationObserver);
