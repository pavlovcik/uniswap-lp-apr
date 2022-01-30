import { state, POSITION_ID, MS_IN_YEAR } from "../calculate-apr";
import { Timestamp } from "../callback";

export function calculateTimings(timestamp: unknown) {
    let depositTime;
    if (state.storage[POSITION_ID]) {
        depositTime = state.storage[POSITION_ID];
    } else {
        try {
            // 1639349303 = 1970-01-19T23:22:29.303Z
            // 1639349303000 = 2021-12-12T22:48:23.000Z
            const ts = parseInt((timestamp as Timestamp).data.positions[0].transaction.timestamp.concat(`000`));
            state.storage[POSITION_ID] = depositTime = ts;
        } catch (err) {
            console.error(err);
            state.storage[POSITION_ID] = depositTime = prompt("Paste the deposit time here");
        }
    }

    const NOW = new Date();
    const DEPOSIT_TIME_LOCAL = new Date(depositTime);

    const TIMEZONE_OFFSET = DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
    state.depositTime = new Date(DEPOSIT_TIME_LOCAL.getTime() - TIMEZONE_OFFSET);
    state.timeElapsed = NOW.getTime() - state.depositTime.getTime();
    state.projectedAPR = state.percentYield / (state.timeElapsed / MS_IN_YEAR);
}
