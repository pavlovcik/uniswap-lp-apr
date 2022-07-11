import { getDepositFromCache } from "./getDepositFromCache";
import { getDeposit } from "./getDepositTime";
import { getDepositTimeFromSubgraph } from "./getDepositTimeFromSubgraph";
import { getPositionIdFromUrl } from "./getPositionIdFromUrl";
import { getPositionValue } from "./getPositionValue";

export {
	Deposit,
	DepositAnalytic as DepositStat,
	DepositOracle as DepositSource,
	getDepositFromCache,
} from "./getDepositFromCache";
export { getDeposit } from "./getDepositTime";
export { getDepositTimeFromSubgraph } from "./getDepositTimeFromSubgraph";
export { getDepositTimeFromUserInput } from "./getDepositTimeFromUserInput";
export { getPositionIdFromUrl } from "./getPositionIdFromUrl";
export { getPositionValue } from "./getPositionValue";

export const get = {
	positionValue: getPositionValue,
	positionIdFromUrl: getPositionIdFromUrl,
	deposit: getDeposit,
	depositFromCache: getDepositFromCache,
	depositTimeFromSubgraph: getDepositTimeFromSubgraph,
};
