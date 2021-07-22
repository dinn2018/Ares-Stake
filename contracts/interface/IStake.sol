
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

interface IStake {

    function stake(uint256 amount) external;

    function withdraw(uint256 amount) external;

    function balanceOf(address account) external view returns (uint256);

    function getAPY() external view returns (uint256);

    function getLockDays() external view returns (uint256);

}
