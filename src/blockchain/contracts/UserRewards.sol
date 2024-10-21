// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserRewards is Ownable {
    IERC20 public piCoin; // The token used for rewards
    mapping(address => uint256) public rewards; // Mapping of user addresses to their rewards

    event RewardIssued(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(IERC20 _piCoin) {
        piCoin = _piCoin; // Set the token contract address
    }

    // Function to issue rewards to a user
    function issueReward(address _user, uint256 _amount) public onlyOwner {
        rewards[_user] += _amount;
        emit RewardIssued(_user, _amount);
    }

    // Function for users to claim their rewards
    function claimReward() public {
        uint256 amount = rewards[msg.sender];
        require(amount > 0, "No rewards to claim");

        rewards[msg.sender] = 0; // Reset the user's reward balance
        piCoin.transfer(msg.sender, amount); // Transfer the rewards

        emit RewardClaimed(msg.sender, amount);
    }

    // Function to check user rewards
    function checkRewards(address _user) public view returns (uint256) {
        return rewards[_user];
    }
}
