import { fetchFromUniswapSubgraph } from "../network";

export type TimestampQueryResponse = {
	data: { positions: [{ transaction: { timestamp: "1639349303" } }] };
};

export async function getDepositTimeFromSubgraph(id: number): Promise<TimestampQueryResponse> {
	const query = `{"query": "{positions(where: {id: ${id}}) {transaction {timestamp}}}"}`;
	const fetched = (await fetchFromUniswapSubgraph(query)) as TimestampQueryResponse;
	return fetched;
}
