import { getDepositTime } from "./getDepositTime";
import { getDepositTimeFromCache } from "./getDepositTimeFromCache";
import { getDepositTimeFromSubgraph } from "./getDepositTimeFromSubgraph";
import { getDepositTimeFromUserInput } from "./getDepositTimeFromUserInput";
import { getPositionIdFromUrl } from "./getPositionIdFromUrl";
import { getPositionValue } from "./getPositionValue";

export const get = {
	positionValue: getPositionValue,
	positionIdFromUrl: getPositionIdFromUrl,
	depositTime: getDepositTime,
	depositTimeFromUserInput: getDepositTimeFromUserInput,
	depositTimeFromCache: getDepositTimeFromCache,
	depositTimeFromSubgraph: getDepositTimeFromSubgraph,
};
