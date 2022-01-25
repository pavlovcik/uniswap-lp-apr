const $ad35ce54ca0a3cff$export$3056659f41d2ed0d = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "inputs": [
            {
                "name": "_initialAmount",
                "type": "uint256"
            },
            {
                "name": "_tokenName",
                "type": "string"
            },
            {
                "name": "_decimalUnits",
                "type": "uint8"
            },
            {
                "name": "_tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    }
];


window.addEventListener("load", function() {
    if (typeof web3 !== "undefined") {
        console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log("No Web3 Detected... using HTTP Provider");
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/bfb36551da7e4eb79368b3ab81780834"));
    }
});
const $6ccaf69bd380659d$var$promisify = (inner)=>new Promise((resolve, reject)=>inner((err, res)=>{
            if (err) reject(err);
            else resolve(res);
        })
    )
;
async function $6ccaf69bd380659d$var$getBalance() {
    var address, wei, balance;
    address = document.getElementById("address").value;
    wei = $6ccaf69bd380659d$var$promisify((cb)=>web3.eth.getBalance(address, cb)
    );
    try {
        balance = web3.fromWei(await wei, "ether");
        document.getElementById("output").innerHTML = balance + " ETH";
    } catch (error) {
        document.getElementById("output").innerHTML = error;
    }
}
async function $6ccaf69bd380659d$var$getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance;
    address = document.getElementById("address").value;
    contractAddress = document.getElementById("contractAddress").value;
    contractABI = $ad35ce54ca0a3cff$export$3056659f41d2ed0d;
    tokenContract = web3.eth.contract(contractABI).at(contractAddress);
    decimals = $6ccaf69bd380659d$var$promisify((cb)=>tokenContract.decimals(cb)
    );
    balance = $6ccaf69bd380659d$var$promisify((cb)=>tokenContract.balanceOf(address, cb)
    );
    name = $6ccaf69bd380659d$var$promisify((cb)=>tokenContract.name(cb)
    );
    symbol = $6ccaf69bd380659d$var$promisify((cb)=>tokenContract.symbol(cb)
    );
    try {
        adjustedBalance = await balance / Math.pow(10, await decimals);
        document.getElementById("output2").innerHTML = adjustedBalance;
        document.getElementById("output2").innerHTML += " " + await symbol + " (" + await name + ")";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}




function $fc90a9c5617c584d$export$3d5544299b855726() {
    const node = document.createElement("div");
    node.style.cssText = `
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
    document.body.append(node);
    return node;
}
function $fc90a9c5617c584d$export$7ef555391b90c662() {
    try {
        const apr = localStorage.getItem("APR");
        if (apr) return JSON.parse(apr);
        else throw new Error("No APR found");
    } catch (e) {
        return $fc90a9c5617c584d$export$7afd3483c5f5fb76();
    }
}
function $fc90a9c5617c584d$export$7afd3483c5f5fb76() {
    localStorage.setItem("APR", "{}");
    return {
    };
}
function $fc90a9c5617c584d$export$1d0057b6da7f313a() {
    const lastNumbersInUrl = window.location.href.match(/\d+$/gim);
    if (!lastNumbersInUrl) throw new Error("No position id found in url");
    return lastNumbersInUrl[0];
}
function $fc90a9c5617c584d$export$b45be5401fe45d66() {
    localStorage.setItem("APR", JSON.stringify($016d5b401e0093b7$export$ca000e230c0caa3e.storage));
}
function $fc90a9c5617c584d$export$a33963c1f35ab3c9(string) {
    $016d5b401e0093b7$export$ca000e230c0caa3e.domNode.innerText = string;
}


function $8dd572c75abb45b6$export$15e3b3fa4f4e9d23() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === "childList") {
                console.log("dom mutation detected");
                const newCaptured = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
                if (!newCaptured) throw new Error("No new captured found");
                $016d5b401e0093b7$export$ca000e230c0caa3e.fees = parseFloat(newCaptured[1].replace(",", "").slice(1));
                $016d5b401e0093b7$export$ca000e230c0caa3e.percentYield = $016d5b401e0093b7$export$ca000e230c0caa3e.fees / $016d5b401e0093b7$export$ca000e230c0caa3e.liquidity;
                $016d5b401e0093b7$export$ca000e230c0caa3e.timeElapsed = new Date().getTime() - $016d5b401e0093b7$export$ca000e230c0caa3e.depositTime.getTime();
                $016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR = $016d5b401e0093b7$export$ca000e230c0caa3e.percentYield / ($016d5b401e0093b7$export$ca000e230c0caa3e.timeElapsed / $016d5b401e0093b7$export$9b52c56f46652ca);
                console.log($016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR);
                console.log($016d5b401e0093b7$export$ca000e230c0caa3e);
                $fc90a9c5617c584d$export$a33963c1f35ab3c9(`${$016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR} · APR\n$${($016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR / 365 * $016d5b401e0093b7$export$ca000e230c0caa3e.liquidity).toFixed(2)} · Daily\n$${($016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR * $016d5b401e0093b7$export$ca000e230c0caa3e.liquidity).toFixed(2)} · Annual`);
            }
        });
    });
    observer.observe(document.getElementById("root"), {
        childList: true,
        subtree: true
    });
}






const $016d5b401e0093b7$export$ca000e230c0caa3e = {
    liquidity: undefined,
    fees: undefined,
    percentYield: undefined,
    depositTime: undefined,
    timeElapsed: undefined,
    projectedAPR: undefined,
    storage: $fc90a9c5617c584d$export$7ef555391b90c662(),
    domNode: $fc90a9c5617c584d$export$3d5544299b855726()
};
const $016d5b401e0093b7$var$CAPTURED = document.body.innerText.match(/^\$[0-9]{1,9}([,.][0-9]{1,9})/gim);
if (!$016d5b401e0093b7$var$CAPTURED) throw new Error("No captured found");
$016d5b401e0093b7$export$ca000e230c0caa3e.liquidity = parseFloat($016d5b401e0093b7$var$CAPTURED[0].replace(",", "").slice(1));
$016d5b401e0093b7$export$ca000e230c0caa3e.fees = parseFloat($016d5b401e0093b7$var$CAPTURED[1].replace(",", "").slice(1));
$016d5b401e0093b7$export$ca000e230c0caa3e.percentYield = $016d5b401e0093b7$export$ca000e230c0caa3e.fees / $016d5b401e0093b7$export$ca000e230c0caa3e.liquidity;
const $016d5b401e0093b7$var$POSITION_ID = $fc90a9c5617c584d$export$1d0057b6da7f313a();
let $016d5b401e0093b7$var$depositTime;
if ($016d5b401e0093b7$export$ca000e230c0caa3e.storage[$016d5b401e0093b7$var$POSITION_ID]) $016d5b401e0093b7$var$depositTime = $016d5b401e0093b7$export$ca000e230c0caa3e.storage[$016d5b401e0093b7$var$POSITION_ID];
else $016d5b401e0093b7$export$ca000e230c0caa3e.storage[$016d5b401e0093b7$var$POSITION_ID] = $016d5b401e0093b7$var$depositTime = prompt("Paste the deposit time here");
const $016d5b401e0093b7$export$9b52c56f46652ca = 31536000000;
const $016d5b401e0093b7$var$NOW = new Date();
const $016d5b401e0093b7$var$DEPOSIT_TIME_LOCAL = new Date($016d5b401e0093b7$var$depositTime);
const $016d5b401e0093b7$var$TIMEZONE_OFFSET = $016d5b401e0093b7$var$DEPOSIT_TIME_LOCAL.getTimezoneOffset() * 60000;
$016d5b401e0093b7$export$ca000e230c0caa3e.depositTime = new Date($016d5b401e0093b7$var$DEPOSIT_TIME_LOCAL.getTime() - $016d5b401e0093b7$var$TIMEZONE_OFFSET);
$016d5b401e0093b7$export$ca000e230c0caa3e.timeElapsed = $016d5b401e0093b7$var$NOW.getTime() - $016d5b401e0093b7$export$ca000e230c0caa3e.depositTime.getTime();
$016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR = $016d5b401e0093b7$export$ca000e230c0caa3e.percentYield / ($016d5b401e0093b7$export$ca000e230c0caa3e.timeElapsed / $016d5b401e0093b7$export$9b52c56f46652ca);
console.log($016d5b401e0093b7$export$ca000e230c0caa3e);
$fc90a9c5617c584d$export$a33963c1f35ab3c9(`${$016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR} · APR\n$${($016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR / 365 * $016d5b401e0093b7$export$ca000e230c0caa3e.liquidity).toFixed(2)} · Daily\n$${($016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR * $016d5b401e0093b7$export$ca000e230c0caa3e.liquidity).toFixed(2)} · Annual`);
const $016d5b401e0093b7$var$newDepositTime = prompt(`APR: ${$016d5b401e0093b7$export$ca000e230c0caa3e.projectedAPR}\nPaste in a new deposit time to update.`);
if ($016d5b401e0093b7$var$newDepositTime) {
    $016d5b401e0093b7$export$ca000e230c0caa3e.storage[$016d5b401e0093b7$var$POSITION_ID] = $016d5b401e0093b7$var$newDepositTime;
    $fc90a9c5617c584d$export$b45be5401fe45d66();
}
$8dd572c75abb45b6$export$15e3b3fa4f4e9d23();




//# sourceMappingURL=index.js.map
