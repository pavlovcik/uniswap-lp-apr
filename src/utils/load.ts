// import Web3 from "web3";
import { abi } from "./abi";
// export function load() {
// 	if (typeof web3 !== "undefined") {
// 		console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
// 		// window.web3 = new window[web3.currentProvider.constructor.name](web3.currentProvider);
// 	} else {
// 		console.log("No Web3 Detected... using HTTP Provider");
// 		window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/bfb36551da7e4eb79368b3ab81780834"));
// 	}
// }

// export async function loadWeb3() {

// }

// export async function load() {
// 	await loadWeb3();
// 	// updateStatus("Ready!");
// }

export async function loadContract(contractAddress: string) {
	if (window.ethereum) {
		const web3 = (window.web3 = new window.Web3(window.ethereum));
		window.ethereum.enable();
		return new web3.eth.Contract(abi, contractAddress);
	}
}
