export function getPositionIdFromUrl(): -1 | number {
	const lastNumbersInUrl = window.location.href.match(/\d+/gim);
	if (!lastNumbersInUrl) {
		console.error("No position id found in url");
		return -1;
	}
	return parseInt(lastNumbersInUrl[0]);
}
