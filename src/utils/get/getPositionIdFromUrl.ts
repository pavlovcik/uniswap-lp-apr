export function getPositionIdFromUrl(): -1 | number {
	const lastNumbersInUrl = window.location.href.match(/\d+/gim);
	if (!lastNumbersInUrl) {
		return -1;
	}
	return parseInt(lastNumbersInUrl[0]);
}
