import { attachMutationObserver } from "./attachMutationObserver";
import { setupDomNode } from "./setupDomNode";
import { syncDom } from "./syncStateAndDom";
import { updateDomNode } from "./updateDomNode";

export const dom = {
	setupDomNode,
	updateDomNode,
	sync: syncDom,
	attachMutationObserver,
};
