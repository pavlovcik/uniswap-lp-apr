import { getDeposit } from "./getDepositTime";
import { getDepositFromCache } from "./getDepositFromCache";
import { getDepositTimeFromSubgraph } from "./getDepositTimeFromSubgraph";
import { getDepositFromUserInput } from "./getDepositTimeFromUserInput";
import { getPositionIdFromUrl } from "./getPositionIdFromUrl";
import { getPositionValue } from "./getPositionValue";

export const get = {
	positionValue: getPositionValue,
	positionIdFromUrl: getPositionIdFromUrl,
	deposit: getDeposit,
	depositFromCache: getDepositFromCache,
	depositFromUserInput: getDepositFromUserInput,
	depositTimeFromSubgraph: getDepositTimeFromSubgraph,
};
