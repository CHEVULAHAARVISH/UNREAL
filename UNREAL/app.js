// Connect to the nUSD contract
const contractAddress = "0x14f4f1F80C1E3A1859c53ab5950852a8aD93cAb2";
const contractABI = [
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nusdAmount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "redeem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nusdAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethValue",
        "type": "uint256"
      }
    ],
    "name": "Redeem",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "exchangeRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEthBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
/// Get the signer (connected to the user's wallet)
let signer;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      await getBalance(); // Update balance after connecting wallet
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Metamask extension not found");
  }
}

async function getBalance() {
  if (signer) {
    const address = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const balance = await contract.balanceOf(address);
    document.getElementById("balance").textContent = balance.toString();
  } else {
    document.getElementById("balance").textContent = "Wallet not connected";
  }
}


async function deposit() {
  const depositInput = document.getElementById("depositInput");
  const depositAmount = ethers.utils.parseEther(depositInput.value);

  try {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.deposit({ value: depositAmount });
      await tx.wait();
      depositInput.value = "";
      await getBalance();
    }
  } catch (error) {
    console.error(error);
  }
}

async function redeem() {
  const redeemInput = document.getElementById("redeemInput");
  const redeemAmount = ethers.utils.parseUnits(redeemInput.value, 0); // Parse input value as uint256

  try {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.redeem(redeemAmount);
      await tx.wait();
      redeemInput.value = "";
      getBalance();
    }
  } catch (error) {
    console.error(error);
  }
}


// Add event listeners to buttons
const connectWalletButton = document.getElementById("connectWalletButton");
const depositButton = document.getElementById("depositButton");
const redeemButton = document.getElementById("redeemButton");

connectWalletButton.addEventListener("click", connectWallet);
depositButton.addEventListener("click", deposit);
redeemButton.addEventListener("click", redeem);

// Connect wallet and update balance on page load
connectWallet();

// Update balance periodically (e.g., every 5 seconds)
setInterval(getBalance, 5000);