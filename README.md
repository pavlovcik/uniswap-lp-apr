# Uniswap V3 LP Performance HUD

A quick way to monitor the performance of your Uniswap V3 positions. Displays current APR, daily estimated yield and annual estimated yield.

## Features

-   Generates the HUD.
-   Automatically checks the chain for deposit transaction timestamp, to calculate APR.
    -   Warning: CORS issues on occasion, falls back to manual timestamp entry.
    -   Saves deposit time to local storage.
    -   HUD updates when Uniswap "Unclaimed fees" updates, which is useful when a position is young.

## Screenshot

![image](https://user-images.githubusercontent.com/4975670/152696785-2efd1fa6-6b20-4295-9dd6-60c6ad82cd4a.png)

## Installation

```shell
yarn && yarn build
```

1. This will export an optimized version to `dist/closured.js` using `google-closure-compiler`

## Bookmarklet

Create a bookmarklet with the following "URL" to quickly prototype changes when using `yarn watch` to build automatically on change.

```javascript
javascript: (function () {
	const script = document.createElement("script");
	script.setAttribute("src", "http://localhost:8888/index.js");
	document.body.appendChild(script);
})();
```

This will expose `closured.js` on localhost for fast prototyping in the browser using `yarn serve`. Just click the bookmarklet to reload!

## Troubleshooting

### Google Closure Compiler

Randomly, on my M1 Mac I started getting `Error: spawn Unknown system error -86` when trying to launch Google Closure Compiler.

Turns out the solution was to install rosetta? Even though I'm pretty sure I already had it, given that I was building this project a couple days ago on the same machine.

```bash
softwareupdate --install-rosetta
```
