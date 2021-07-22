// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol"; 

import "./interface/IStake.sol";
import "./interface/IReward.sol";

contract AresStake is Ownable, IStake {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // percent of hundreads.
    uint256 public apy;

    // days to lock stake.
    uint256 public lockDays;

    // stake erc20 token 
    IERC20 private token;

    IReward private reward;

    uint256 private _totalSupply;

    struct Balance {
        uint256 amount;
        uint256 lastStakeTime;
    }

    mapping(address => Balance) private balances;

    event UpdateAPY(uint256 _apy);

    event Staked(address indexed user, uint256 amount);

    event Withdrawn(address indexed user, uint256 amount);

    constructor(uint256 _lockDays, uint256 _apy, IERC20 _token) {
        lockDays = _lockDays * 1 days;
        apy = _apy;
        token = _token;
    }

    function setRewardPool(IReward _reward) public onlyOwner {
        reward = _reward;
    }

    function updateAPY(uint256 _apy) public onlyOwner {
        require(_apy > 0, "not a apy");
        apy = _apy;
        emit UpdateAPY(_apy);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return balances[account].amount;
    }

    function getAPY() public view override returns (uint256) {
        return apy;
    }

    function getLockDays() public view override returns (uint256) {
        return lockDays;
    }

    function stake(uint256 amount) public override hasRewardPool {
        require(amount > 0, "can not stake 0");
        reward.update(msg.sender);
        _totalSupply = _totalSupply.add(amount);
        balances[msg.sender].amount = balances[msg.sender].amount.add(amount);
        balances[msg.sender].lastStakeTime = block.timestamp;
        token.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) public override hasRewardPool {
        require(amount > 0, "Cannot withdraw 0");
        require(block.timestamp > balances[msg.sender].lastStakeTime.add(lockDays), "time not end");
        reward.update(msg.sender);
        _totalSupply = _totalSupply.sub(amount);
        balances[msg.sender].amount = balances[msg.sender].amount.sub(amount);
        token.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function withdrawReward() public hasRewardPool {
        reward.withdraw(msg.sender);
    }

    function exit() public hasRewardPool {
        withdraw(balanceOf(msg.sender));
        withdrawReward();
    }

    function destructRewardPool(address payable account) public onlyOwner {
        reward.destruct(account);
    }

    modifier hasRewardPool() {
        require(address(reward) != address(0), "reward pool must be set first");
        _;
    }

    
}
