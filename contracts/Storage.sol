// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Storage {

    uint256 number;
    
    event stored(uint256 _value);

    function store(uint256 num) public {
        number = num;
        emit stored(number);
    }
    
    function retrieve()public view returns(uint256){
        return number;
    }

}
