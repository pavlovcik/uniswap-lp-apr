import { main } from "../utils";
import { attachMutationObserver } from "../utils/attach-mutation-observer";
import { State } from "./State";

(async function setup(state: State) {
	await main(state);
	attachMutationObserver(state);
	return state;
})((window.state = new State()));
declare global {
	interface Window {
		state: State;
	}
}
