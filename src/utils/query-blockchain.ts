import { TimestampQueryResponse } from "./types";

const UNISWAP_V3_API = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

export async function queryTimestampFromBlockchain(query: string): Promise<string> {
	const fetched = (await fetchFromUniswap(query)) as TimestampQueryResponse;
	return fetched.data.positions[0].transaction.timestamp;
}

// async function queryBlockchain(query: string) {
// 	return await fetchFromUniswap(query);
// }

async function fetchFromUniswap(body: string) {
	const res: Response = await fetch(UNISWAP_V3_API, {
		method: "POST",
		body: body,
		headers: { "Content-Type": "application/json" },
	});
	return await res.json();
}
