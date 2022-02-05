import { TimestampQueryResponse } from "../render-ui";

const UNISWAP_V3_API = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

export async function queryBlockchain(query: string) {
	return await fetchFromUniswap(query);
}

// This return type should be generalized but this was easier to implement for now
async function fetchFromUniswap(body: string): Promise<TimestampQueryResponse> {
	const res: Response = await fetch(UNISWAP_V3_API, {
		method: "POST",
		body: body,
		headers: { "Content-Type": "application/json" },
	});
	return await res.json();
}
