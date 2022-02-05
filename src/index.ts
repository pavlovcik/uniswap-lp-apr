import packageJson from "../package.json";
import { State } from "./State";
import { main } from "./utils";
import { dom } from "./utils/dom";

main((window.state = new State())).then(dom.attachMutationObserver);

console.log(`Uniswap APR Bookmarklet loaded successfully. Version ${packageJson.version}.`);
declare global {
	interface Window {
		state: State;
	}
}
