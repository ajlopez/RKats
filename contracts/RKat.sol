// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract RKat is ERC721 {
    bytes5[] public rkats;
    mapping(bytes5 => bool) public rkatExists;

    constructor() 
        ERC721("RKat", "RKAT") 
        public {
    }
    
    function initialize(uint from, uint n) public {
        require(rkats.length == from, "rkats already generated");
        
        uint v = 0x00ff00000000;
        
        for (uint k = 0; k < n; k++) {
            bytes32 value = bytes32((v | ((k + from) << 24)) << (8*27));
            mint(bytes5(value));
        }
    }
    
    function mint(bytes5 rkat) public {
        require(!rkatExists[rkat], "rkat already exists");
        
        uint id = rkats.length;
        rkats.push(rkat);
        rkatExists[rkat] = true;
        _mint(msg.sender, id);
    }
}

