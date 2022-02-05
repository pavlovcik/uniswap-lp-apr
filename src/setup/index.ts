import { main } from "../utils";
import { attachMutationObserver } from "../utils/attach-mutation-observer";
import { State } from "./State";

main((window.state = new State())).then(attachMutationObserver);
