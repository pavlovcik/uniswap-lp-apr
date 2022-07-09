import { State } from "../../State";
import { updateDomNode } from "./updateDomNode";

export function syncDom(state: State) {
	updateDomNode(state);
	return state;
}
