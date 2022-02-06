import { main } from "..";
import { State } from "../../State";

export function attachMutationObserver(state: State) {
	if (!state.observerAttached) {
		state.observerAttached = true;
	} else {
		throw new Error("Mutation observer already attached.");
	}

	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));
	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});
	async function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			await main(state);
		}
	}
}
