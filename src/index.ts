import { MetaMaskInpageProvider } from "@metamask/providers";
import { version } from "../package.json";
import { State } from "./State";
import { main } from "./utils";
import { dom } from "./utils/dom";

if (window.state) {
	// a previous instance exists, so remove it
	window.state.observer?.disconnect();
	window.state.domNode?.parentElement?.removeChild(window.state.domNode);
	delete window.state;
}

const state = (window.state = new State());

dom.attachMutationObserver(state); // just once

main(state)
	.then(() => {
		console.log(`Uniswap APR Bookmarklet loaded successfully. Version ${version}.`);
		console.log(`Access bookmarklet state via window.state.`);
	})
	.catch((error) => console.error(error));

declare global {
	interface Window {
		state?: State;
		ethereum: MetaMaskInpageProvider;
		Web3: never;
		web3: never;
	}
}
