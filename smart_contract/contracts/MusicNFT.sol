// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MusicNFT is ERC721 {
    struct TokenData{
        string tokenUri;
        uint256 parentTokenId;
        bool isForkable; 
        uint256 forkPrice;
        string fingerprint;
        string spectrogram;
        address creator;
    }

    uint256 public tokenCounter;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => TokenData) private _tokenData;

    constructor() ERC721("MusicNFT", "MUS") {
        tokenCounter = 1;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override{
        require(from == address(0), "Token not transferable");
        super.transferFrom(from, to, tokenId);
    }


    function setTokenURI(
        uint256 tokenId, 
        string memory tokenUri, 
        string memory fingerprint, 
        string memory spectrogram,
        address creator
    ) private{
        TokenData memory tokenData = TokenData(tokenUri, 0, false, 0, fingerprint, spectrogram, creator);
        _tokenData[tokenId] = tokenData;
    }

    function createCollectible(string memory tokenUri, string memory fingerprint, 
                            string memory spectrogram) public returns(uint256){
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        setTokenURI(tokenId, tokenUri, fingerprint, spectrogram, msg.sender);
        tokenCounter++;
        return tokenId;
    }

    function setForkable(uint256 tokenId, bool isForkable, uint256 forkPrice) public{
        require(ownerOf(tokenId) == msg.sender, "Only owner can set forkable");
        require(_tokenData[tokenId].parentTokenId == 0, "Cannot be forked");
        _tokenData[tokenId].isForkable = isForkable;
        _tokenData[tokenId].forkPrice = forkPrice;
    }

    function unsetForkable(uint256 tokenId) public{
        require(ownerOf(tokenId) == msg.sender, "Only owner can unset forkable");
        require(_tokenData[tokenId].parentTokenId == 0, "Cannot be unforked");
        _tokenData[tokenId].isForkable = false;
        _tokenData[tokenId].forkPrice = 0;
    }

    function forkCollectible(uint256 tokenId, string memory tokenUri) public returns(uint256){
        require(_tokenData[tokenId].isForkable, "Token is not forkable");
        uint256 forkedTokenId = tokenCounter;
        _safeMint(msg.sender, forkedTokenId);
        setTokenURI(forkedTokenId, tokenUri, "", "", _tokenData[tokenId].creator);
        _tokenData[forkedTokenId].parentTokenId = tokenId;
        _ownedTokens[msg.sender].push(forkedTokenId);
        tokenCounter++;
        return forkedTokenId;
    }

    function burnCollectible(uint256 tokenId) public{
        require(ownerOf(tokenId) == msg.sender, "Only owner can burn");
        _burn(tokenId);
    }

    function getOwnedTokens(address owner) public view returns(TokenData[] memory){
        uint256[] memory tokenIds = _ownedTokens[owner];
        TokenData[] memory tokenDatas = new TokenData[](tokenIds.length);
        for(uint256 i = 0; i < tokenIds.length; i++){
            tokenDatas[i] = _tokenData[tokenIds[i]];
        }
        return tokenDatas;
    }

    function getForkable() public view returns(TokenData[] memory){
        uint256 count = 0;
        for(uint256 i = 0; i<tokenCounter; i++){
            if(_tokenData[i].isForkable){
                count++;
            }
        }

        TokenData[] memory tokenDatas = new TokenData[](count);
        uint256 index = 0;
        for(uint256 i = 0; i<tokenCounter; i++){
            if(_tokenData[i].isForkable){
                tokenDatas[index] = _tokenData[i];
                index++;
            }
        }
        return tokenDatas;
    }

    function getByTokenId(uint256 tokenId) public view returns(TokenData memory){
        return _tokenData[tokenId];
    }
}

