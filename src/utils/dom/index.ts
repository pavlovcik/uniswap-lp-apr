import { setupDomNode } from "./setupDomNode";
import { updateDomNode } from "./updateDomNode";
import { syncStatePositionAndDom } from "./syncStatePositionAndDom";
import { attachMutationObserver } from "./attachMutationObserver";

export const dom = {
	setupDomNode,
	updateDomNode,
	syncStatePositionAndDom,
	attachMutationObserver,
};
