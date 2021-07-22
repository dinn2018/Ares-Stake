// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// FourEver token
contract Token is ERC20 {

    constructor(address test) ERC20("4Ever", "EVER") {
        uint256 unit = uint256(1e18);
        _mint(test, 2000e9 * unit);
    }

}
