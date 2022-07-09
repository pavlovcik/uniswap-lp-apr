const CSS_TEXT = `

#uniswap-apr {
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 16px;
    border-radius: 16px;
    margin: 16px 10px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    font-weight: 500;
}

#uniswap-apr::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    animation: rotate-360 1.5s linear infinite;
    border: 4px solid rgb(25, 102, 212);
    border-bottom: 4px solid transparent;
    border-top: 4px solid transparent;
    transition: 0.5s;
    opacity: 1;
    pointer-events: none;
}

#uniswap-apr.active::before {
    opacity: 0;
	transition: none;
}

#uniswap-apr.active {
    background: rgb(33, 36, 41);
    border-color: rgb(25, 27, 31);
}

@keyframes rotate-360 {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

#uniswap-apr ul {
    padding: 0;
    list-style: none;
    margin: 0;
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
