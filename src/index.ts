import { version } from "../package.json";
import { State } from "./State";
import { main } from "./utils";
import { dom } from "./utils/dom";

const state = (window.state = new State());

dom.attachMutationObserver(state); // just once

main(state);
console.log(`Uniswap APR Bookmarklet loaded successfully. Version ${version}.`);
console.log(`Access bookmarklet state via window.state.`);

declare global {
	interface Window {
		state: State;
		ethereum: any;
		Web3: any;
		web3: any;
	}
}
