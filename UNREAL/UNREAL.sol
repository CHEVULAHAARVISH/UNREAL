// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract nUSD {
    string public name = "nUSD";
    string public symbol = "nUSD";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    
    uint256 public exchangeRate = 3; // Exchange rate: 1 ETH = 3 nUSD

    event Deposit(address indexed from, uint256 ethAmount, uint256 nusdAmount);
    event Redeem(address indexed from, uint256 nusdAmount, uint256 ethAmount, uint256 ethValue);

    constructor() {
        totalSupply = 0;
    }

    function deposit() external payable {
        uint256 ethAmount = msg.value;
        require(ethAmount > 0, "Invalid ETH amount");

        uint256 nusdAmount = ethAmount * exchangeRate / 2; // Calculate nUSD amount as half of ETH
        
        // Mint nUSD tokens to the sender
        balanceOf[msg.sender] += nusdAmount;
        totalSupply += nusdAmount;
        
        emit Deposit(msg.sender, ethAmount, nusdAmount);
    }
    
    function redeem(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "Insufficient nUSD balance");
        
        uint256 ethAmount = amount / (exchangeRate * 2); // Double the amount of nUSD to get ETH
        
        // Burn nUSD tokens from the sender
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        
        // Transfer ETH to the sender
        payable(msg.sender).transfer(ethAmount);
        
        uint256 ethValueAfter = address(this).balance; // Get the ETH balance after redemption
        
        emit Redeem(msg.sender, amount, ethAmount, ethValueAfter);
    }
    
    function getEthBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
