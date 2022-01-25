//
import { abi } from "./abi";
import { loadContract } from "./load";
const promisify = (inner) =>
	new Promise((resolve, reject) =>
		inner((err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	);

// export async function getBalance() {
// 	var address, wei, balance;
// 	address = document.getElementById("address").value;
// 	wei = promisify((cb) => web3.eth.getBalance(address, cb));
// 	try {
// 		balance = web3.fromWei(await wei, "ether");
// 		document.getElementById("output").innerHTML = balance + " ETH";
// 	} catch (error) {
// 		document.getElementById("output").innerHTML = error;
// 	}
// }

export async function getERC20Balance(address: string, contractAddress: string) {
	const contract = await loadContract(contractAddress);
	let contractABI, decimals, balance, name, symbol, adjustedBalance;
	// address = document.getElementById("address").value;
	// contractAddress = document.getElementById("contractAddress").value;
	contractABI = abi;

	// @ts-ignore
	const tokenContract = web3.eth.contract(contractABI).at(contractAddress);

	decimals = promisify((cb) => tokenContract.decimals(cb));
	balance = promisify((cb) => tokenContract.balanceOf(address, cb));
	name = promisify((cb) => tokenContract.name(cb));
	symbol = promisify((cb) => tokenContract.symbol(cb));

	try {
		// @ts-ignore
		adjustedBalance = (await balance) / Math.pow(10, await decimals);
		console.log({ adjustedBalance });
		console.log((await symbol) + " (" + (await name) + ")");
	} catch (error) {
		console.error({ error });
	}
}
