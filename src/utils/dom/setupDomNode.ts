const CSS_TEXT = `

#uniswap-apr {
	position: fixed;
	top: 0;
	z-index: 2;
	padding: 8px;
	background: rgb(33, 36, 41);
	border-radius: 16px;
	margin: 16px;
	border: 2px solid rgb(25, 27, 31);
	font-weight: 500;
}

#uniswap-apr.active {
	background: red;
}

`;

export function setupDomNode() {
	const node = document.createElement("div");
	node.id = "uniswap-apr";
	generateStyle();
	document.body.append(node);
	return node;
}

function generateStyle() {
	const styleSheet = document.createElement("style");
	styleSheet.innerText = CSS_TEXT;
	document.head.appendChild(styleSheet);
}
