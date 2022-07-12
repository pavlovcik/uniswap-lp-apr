import { State } from "../../State";
import { updatePlotNode } from "./charting";
import { updateHudNode } from "./updateDomNode";

export function syncDom(state: State) {
	updateHudNode(state);
	updatePlotNode(state);
	return state;
}
