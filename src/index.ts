import packageJson from "../package.json";
import "./setup";
import { State } from "./setup/State";

console.log(`Uniswap APR Bookmarklet loaded successfully. Version ${packageJson.version}.`);

declare global {
	interface Window {
		state: State;
	}
}
