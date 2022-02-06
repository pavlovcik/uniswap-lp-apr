import { version } from "../package.json";
import { State } from "./State";
import { main } from "./utils";
import { dom } from "./utils/dom";

const state = (window.state = new State());

dom.attachMutationObserver(state);
main(state);
console.log(`Uniswap APR Bookmarklet loaded successfully. Version ${version}.`);

declare global {
	interface Window {
		state: State;
	}
}
