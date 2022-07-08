import { setupDomNode } from "./setupDomNode";
import { updateDomNode } from "./updateDomNode";
import { syncDom } from "./syncStateAndDom";
import { attachMutationObserver } from "./attachMutationObserver";

export const dom = {
	setupDomNode,
	updateDomNode,
	sync: syncDom,
	attachMutationObserver,
};
