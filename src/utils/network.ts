const UNISWAP_V3_API = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

export const network = {
	queryTimestampFromBlockchain,
	fetchFromUniswap,
};

export type TimestampQueryResponse = {
	data: { positions: [{ transaction: { timestamp: "1639349303" } }] };
};

async function queryTimestampFromBlockchain(id: number): Promise<TimestampQueryResponse> {
	const query = `{"query": "{positions(where: {id: ${id}}) {transaction {timestamp}}}"}`;
	const fetched = (await fetchFromUniswap(query)) as TimestampQueryResponse;
	return fetched; // .data.positions[0].transaction.timestamp;
}

async function fetchFromUniswap(body: string) {
	const res: Response = await fetch(UNISWAP_V3_API, {
		method: "POST",
		body: body,
		headers: { "Content-Type": "application/json" },
	});
	return await res.json();
}
