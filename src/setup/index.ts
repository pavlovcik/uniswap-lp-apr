import { main } from "../utils";
import { dom } from "../utils/dom";
import { State } from "./State";

main((window.state = new State())).then(dom.attachMutationObserver);
