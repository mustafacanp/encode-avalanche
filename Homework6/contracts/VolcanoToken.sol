//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VolcanoToken is ERC721, Ownable {
    uint tokenID = 0;

    struct Volcano {
        uint timestamp;
        uint tokenId;
        string tokenURI;
    }

    mapping(address => Volcano[]) public ownership;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(string memory _tokenURI) public {
        Volcano memory token = Volcano({
            timestamp: block.timestamp,
            tokenId: tokenID,
            tokenURI: _tokenURI
        });
        _safeMint(msg.sender, tokenID);
        ownership[msg.sender].push(token);
        tokenID++;
    }

    function burn(uint _tokenID) public {
        require(msg.sender == ownerOf(_tokenID), "You can not burn someone else's token");
        _burn(_tokenID);
        removeTokenFromOwnership(_tokenID);
    }

    function tokenURI(uint tokenId) public view virtual override returns (string memory) {
        uint tokenCount = ownership[msg.sender].length;
        require(tokenCount > 0);
        for(uint i=0; i<tokenCount; i++) {
            if(ownership[msg.sender][i].tokenId == tokenId){
                return ownership[msg.sender][i].tokenURI;
            }
        }
        return "";
    }

    function removeTokenFromOwnership(uint tokenId) internal {
        uint tokenCount = ownership[msg.sender].length;
        Volcano[] storage userTokens = ownership[msg.sender];
        require(tokenCount > 0);
        for(uint i=0; i<tokenCount; i++) {
            if(ownership[msg.sender][i].tokenId == tokenId){
                delete ownership[msg.sender][i];
                userTokens[i] = userTokens[userTokens.length-1];
                userTokens.pop();
            }
        }
    }
}
