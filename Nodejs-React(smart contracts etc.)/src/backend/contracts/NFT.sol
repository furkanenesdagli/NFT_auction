// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ERC721 : Çoğu fonksiyonu içerisinde barındıran nft standartı.
 
contract NFT is ERC721URIStorage {
    uint public tokenCount;
    constructor() ERC721("Deneme NFT", "DENEME"){}
    function mint(string memory _tokenURI) external returns(uint) { //mint yeni oluşturulan bir miktar parayı başka bir adrese gönderir
        tokenCount ++; 
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }
}