import { getDepositTime } from "./getDepositTime";
import { getDepositTimeFromCache } from "./getDepositTimeFromCache";
import { getPositionIdFromUrl } from "./getPositionIdFromUrl";
import { getPositionValue } from "./getPositionValue";

export const get = {
	depositTime: getDepositTime,
	positionIdFromUrl: getPositionIdFromUrl,
	depositTimeFromCache: getDepositTimeFromCache,
	positionValue: getPositionValue,
};
