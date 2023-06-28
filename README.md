README.md

# nUSD Token Web Application

This is a simple web application that allows users to interact with the nUSD token contract deployed on the Ethereum blockchain. Users can connect their wallets, view their nUSD token balance, deposit Ether to receive nUSD tokens, and redeem nUSD tokens to receive Ether.

## Features

- Connect wallet: Users can connect their Ethereum wallet (e.g., MetaMask) to the web application.
- View balance: Once connected, users can view their nUSD token balance.
- Deposit: Users can deposit Ether to receive nUSD tokens at a fixed exchange rate.
- Redeem: Users can redeem nUSD tokens to receive Ether back.

## How to Run

1. Clone the repository:

```
git clone https://github.com/CHEVULAHAARVISH/UNREAL/tree/main/UNREAL
cd nusd-token-web-app
```

2. Install the dependencies:

```
npm install
```

3. Update the contract address and ABI:

In the `app.js` file, update the `contractAddress` variable with the address of the deployed nUSD token contract on the Ethereum network. Also, ensure that the `contractABI` variable matches the ABI of the deployed contract.

4. Start the web application:

```
npm start
```

5. Open the web application:

Open your web browser and navigate to `http://localhost:3000` to access the nUSD token web application.

6. Connect your wallet:

Click the "Connect Wallet" button to connect your Ethereum wallet (e.g., MetaMask).

7. Interact with the nUSD token contract:

- View Balance: Once connected, your nUSD token balance will be displayed.
- Deposit: Enter the amount of Ether you want to deposit in the input field and click the "Deposit" button.
- Redeem: Enter the amount of nUSD tokens you want to redeem in the input field and click the "Redeem" button.

## Assumptions

- The nUSD token contract is already deployed on the Ethereum network, and the contract address and ABI are provided.
- The web application assumes that the user's Ethereum wallet (e.g., MetaMask) is already installed and configured.
- The web application uses the MetaMask extension to connect to the Ethereum network. Ensure that you have MetaMask installed and logged in to your desired Ethereum account.
- The web application assumes that the user has Ether in their wallet to deposit and sufficient nUSD token balance to redeem.
- The exchange rate between Ether and nUSD tokens is fixed at 1 ETH = 3 nUSD.

## Additional Notes

- The web application uses the ethers.js library to interact with the Ethereum blockchain.
