// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendBorrow {
    address public owner;
    uint256 public interestRate = 5; // 5% interest (simple)

    mapping(address => uint256) public deposits;
    mapping(address => uint256) public loans;

    constructor() {
        owner = msg.sender;
    }

    function lend() external payable {
        require(msg.value > 0, "Must lend some ETH");
        deposits[msg.sender] += msg.value;
    }

    function borrow(uint256 amount) external {
        require(getTotalPool() >= amount, "Not enough liquidity");
        loans[msg.sender] += amount + calculateInterest(amount);
        payable(msg.sender).transfer(amount);
    }

    function repay() external payable {
        require(msg.value >= loans[msg.sender], "Repay full loan + interest");
        loans[msg.sender] = 0;
    }

    function getTotalPool() public view returns (uint256) {
        return address(this).balance;
    }

    function calculateInterest(uint256 amount) public view returns (uint256) {
        return (amount * interestRate) / 100;
    }
}
