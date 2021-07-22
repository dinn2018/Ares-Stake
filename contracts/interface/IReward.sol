// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

interface IReward {

    function update(address account) external;

    function withdraw(address account) external;
    
    function getReward(address account) external view returns (uint256);

    function destruct(address payable account) external;
    
}