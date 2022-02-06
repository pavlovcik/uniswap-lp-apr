const UNISWAP_V3_API = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

export const network = {
	fetchFromUniswapSubgraph,
};

export async function fetchFromUniswapSubgraph(body: string) {
	const res: Response = await fetch(UNISWAP_V3_API, {
		method: "POST",
		body: body,
		headers: { "Content-Type": "application/json" },
	});
	return await res.json();
}
