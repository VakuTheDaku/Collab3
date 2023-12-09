// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MusicNFT is ERC721 {
    uint256 public tokenCounter;
    mapping (address => uint256[]) private mintedTokens;
    mapping(uint256 => string) private _tokenURI;

    constructor() ERC721("MusicNFT", "MUS") {
        tokenCounter = 0;
    }

    function setTokenURI(uint256 tokenId, string memory tokenUri) private{
        _tokenURI[tokenId] = tokenUri;
    }

    function createCollectible(string memory tokenUri) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        setTokenURI(newItemId, tokenUri);
        tokenCounter = tokenCounter + 1;
        mintedTokens[msg.sender].push(newItemId);
        return newItemId;
    }

    function viewCollectible(uint256 tokenId) public view returns (string memory) {
        return _tokenURI[tokenId];
    }

    function viewAllCollectibles() public view returns (uint[] memory) {
        return mintedTokens[msg.sender];
    }
    
}

