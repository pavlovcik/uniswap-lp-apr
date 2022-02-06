import { State, StatePosition } from "../../State";
import { updateDomNode } from "./updateDomNode";

export function syncStatePositionAndDom(state: State, positionState: StatePosition) {
	console.log(state);
	const merged = Object.assign(state, { position: positionState });
	return updateDomNode(merged);
}
