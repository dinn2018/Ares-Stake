// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 
import "./interface/IReward.sol";
import "./interface/IStake.sol";

contract AresReward is IReward {

    using SafeMath for uint256;

    // reward erc20 token maybe not same as stake token.
    IERC20 public token;

    IStake public stake;

    struct UserReward {
        uint256 lastRewardUpdatedTime;
        uint256 amount;
    }

    mapping(address => UserReward) public userReward;

    event Withdrawn(address indexed user, uint256 amount);

    constructor(IStake _stake, IERC20 _token) {
        stake = _stake;
        token = _token;
    }

    function update(address account) public override {
        userReward[account].amount = getReward(account);
        userReward[account].lastRewardUpdatedTime = block.timestamp;
    }

    function getPendingReward(address account) public view returns (uint256) {
        if (userReward[account].lastRewardUpdatedTime == 0) {
            return 0;
        }
        uint256 amount = stake.balanceOf(account);
        uint256 apy = stake.getAPY();
        uint256 time = block.timestamp.sub(userReward[account].lastRewardUpdatedTime);
        uint256 reaward = amount.mul(time).mul(apy).div(uint256(365 days)).div(100);
        return reaward;
    }

    function getReward(address account) public view override returns (uint256) {
        uint256 amount = userReward[account].amount;
        uint256 pending = getPendingReward(account);
        return amount.add(pending);
    }

    function withdraw(address account) public override onlyStake {
        update(account);
        uint256 amount = getReward(account);
        token.transfer(account, amount);
        emit Withdrawn(account, amount);
    }

    function destruct(address payable account) public override onlyStake {
        selfdestruct(account);
    }

    modifier onlyStake() {
        require(msg.sender == address(stake), "can be called by stake only.");
        _;
    }

}