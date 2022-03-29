// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity ^0.8.0;


// This is the main building block for smart contracts.
contract Token is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol){
        _mint(msg.sender,100000000 * 10 **  decimals());
    }

}
