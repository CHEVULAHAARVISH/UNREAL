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
    
    function redeem(uint amount) external {
        uint256 nusdAmount = uint256(amount); // Convert uint to uint256
        
        require(balanceOf[msg.sender] >= nusdAmount, "Insufficient nUSD balance");
        
        uint256 ethAmount = nusdAmount / exchangeRate * 2; // Correct calculation: Double the amount of nUSD to get ETH
        
        // Burn nUSD tokens from the sender
        balanceOf[msg.sender] -= nusdAmount;
        totalSupply -= nusdAmount;
        
        // Transfer ETH to the sender
        payable(msg.sender).transfer(ethAmount);
        
        uint256 ethValueAfter = address(this).balance; // Get the ETH balance after redemption
        
        emit Redeem(msg.sender, nusdAmount, ethAmount, ethValueAfter);
    }

    
    function getEthBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getBalance(address account) public view returns (uint256) {
        uint256 balance = balanceOf[account];
        return balance / 10**18; // Divide by 10^18 to display up to 18 decimal places
    }

}
