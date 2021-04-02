// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract RKat is ERC721 {
    constructor() 
        ERC721("RKat", "RKAT") 
        public {
    }
}

