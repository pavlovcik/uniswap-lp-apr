import { fetchFromUniswapSubgraph } from "../network";

export type DepositTimeSubGraphResponse = {
	data: { positions: [{ transaction: { timestamp: "1639349303" } }] };
};

export async function getDepositTimeFromSubgraph(id: number): Promise<DepositTimeSubGraphResponse> {
	const query = `{"query": "{positions(where: {id: ${id}}) {transaction {timestamp}}}"}`;
	const fetched = (await fetchFromUniswapSubgraph(query)) as DepositTimeSubGraphResponse;
	return fetched;
}
