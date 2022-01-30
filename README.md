# Uniswap V3 LP Performance HUD

A quick way to monitor the performance of your Uniswap V3 positions. Displays current APR, daily estimated yield ($) and annual estimated yield ($).

## Features

- Generates the HUD.
- Automatically checks the chain for deposit transaction timestamp, to calculate APR.
  - Warning: CORS issues on occasion, falls back to manual timestamp entry.
  - Saves deposit time to local storage.
  - HUD updates when Uniswap "Unclaimed fees" updates, which is useful when a position is young.

## Screenshot

![image](https://user-images.githubusercontent.com/4975670/151696915-04a0fad0-b9e3-4c69-b8a4-2121d8a4fecd.png)

## Installation

```shell
yarn && yarn build
```

1. This will copy the compiled code to your clipboard (using MacOS stock `pbcopy`.)
2. Afterwards make a bookmark and paste the code into the bookmark's URL.