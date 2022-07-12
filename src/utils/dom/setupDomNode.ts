import fs from "fs";
import path from "path";

generateStyle();

export function setupHudNode() {
	const node = document.createElement("div");
	node.id = "uniswap-apr-hud";
	document.body.append(node);
	return node;
}
export function setupPlotNode() {
	const node = document.createElement("div");
	node.id = "uniswap-apr-plotter";
	document.body.append(node);
	return node;
}

function generateStyle() {
	const style = document.createElement("style");
	style.id = "uniswap-apr-style";
	const CSS_TEXT = fs.readFileSync(path.join(__dirname, "./uniswap-apr.css"), "utf8");
	style.textContent = CSS_TEXT;
	document.head.appendChild(style);
	return style;
}
