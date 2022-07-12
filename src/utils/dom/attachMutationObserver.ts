import { main } from "..";
import { State } from "../../State";

export function attachMutationObserver(state: State) {
	if (state.observer) {
		throw new Error("Mutation observer already attached.");
	}

	const observer = new MutationObserver((mutations) => mutations.forEach(mutator));
	observer.observe(document.getElementById("root") as HTMLElement, {
		childList: true,
		subtree: true,
	});

	function mutator(mutation: MutationRecord) {
		if (mutation.type === "childList") {
			programLoop(state);
		}
	}
	return observer;
}

function programLoop(state: State) {
	main(state).catch((error) => console.error(error));
}
