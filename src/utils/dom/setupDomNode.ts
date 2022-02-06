const CSS_TEXT = `
position: fixed;
top: 0;
z-index: 2;
padding: 8px;
background: rgb(33, 36, 41);
border-radius: 16px;
margin: 16px;
border: 2px solid rgb(25, 27, 31);
font-weight: 500;
`;

export function setupDomNode() {
	const node = document.createElement("div");
	node.id = "uniswap-apr";
	node.style.cssText = CSS_TEXT;
	document.body.append(node);
	return node;
}
