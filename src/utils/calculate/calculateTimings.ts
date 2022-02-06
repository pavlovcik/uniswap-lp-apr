import { PositionTiming, SerializedTimestamp } from "../../State";

export function calculateTimings(depositTime: SerializedTimestamp): PositionTiming {
	const NOW = new Date();
	const DEPOSIT_TIME_LOCAL = new Date(depositTime);

	const TIMEZONE_OFFSET = DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
	const localizedDepositTime = new Date(DEPOSIT_TIME_LOCAL.getTime() - TIMEZONE_OFFSET);
	const timeElapsed = NOW.getTime() - localizedDepositTime.getTime();

	const positionTiming = {
		deposit: localizedDepositTime.getTime() as SerializedTimestamp,
		elapsed: timeElapsed,
	};

	return positionTiming;
}
