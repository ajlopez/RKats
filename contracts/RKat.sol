// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract RKat is ERC721 {
    bytes5[] public rkats;
    
    constructor() 
        ERC721("RKat", "RKAT") 
        public {
    }
    
    function mint(bytes5 rkat) public {
        uint id = rkats.length;
        rkats.push(rkat);
        _mint(msg.sender, id);
    }
}

