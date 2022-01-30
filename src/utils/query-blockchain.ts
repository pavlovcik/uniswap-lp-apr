// import type { Response } from "node-fetch";
// import fetch from "node-fetch";
const uniswapV3API = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
const fetchFromUniswap = async (buffer: string): Promise<string> => {
	const res: Response = await fetch(uniswapV3API, { method: "POST", body: buffer, headers: { "Content-Type": "application/json" } });
	return await res.json();
};

export async function queryBlockchain(query: string) {
	return await fetchFromUniswap(query);
}
