import { MetaMaskInpageProvider } from "@metamask/providers";
import { version } from "../package.json";
import { State } from "./State";
import { main } from "./utils";

if (window.state) {
	// a previous instance exists, so remove it
	console.warn(`Previous instance detected!`);
	window.state.observer.disconnect();
	window.state.dom.hud.parentElement?.removeChild(window.state.dom.hud);
	window.state.dom.plot.parentElement?.removeChild(window.state.dom.plot);
}

main((window.state = new State()))
	.then(() => {
		console.log(`Uniswap APR Bookmarklet loaded successfully. Version ${version}.`);
		console.log(`Access bookmarklet state via window.state.`);
	})
	.catch(catchAndRenderError);

declare global {
	interface Window {
		state: State;
		ethereum: MetaMaskInpageProvider;
	}
}

export function catchAndRenderError(error: Error) {
	console.error(error);
	window.state.dom.hud.innerText = (error as Error).toString();
	window.state.dom.hud.className = "active";
}
