import { main } from "..";
import { State } from "../../State";
import { charting } from "./charting";

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
	state.observer = observer;
}

function programLoop(state: State) {
	charting(state);
	main(state);
}
