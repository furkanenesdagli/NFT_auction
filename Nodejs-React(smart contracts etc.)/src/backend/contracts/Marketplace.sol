// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// OpenZeppelin kütüphaneleri
import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // ERC721 standardını uygulayan tokenlara erişim sağlar
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Reentrancy saldırılarına karşı koruma sağlar
import "hardhat/console.sol"; 

contract Marketplace is ReentrancyGuard {
    
    address payable public immutable feeAccount; 
    uint public immutable feePercent; 
    uint public itemCount; 
   

    struct Item {
        uint itemId; 
        IERC721 nft; // ERC721 token'ı
        uint tokenId; // ERC721 token'ın kimliği
        uint price; 
        address payable seller; 
        bool sold; 
    }

    
    mapping(uint => Item) public items;

    
    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    // Yapıcı fonksiyon, pazar yeri ayarlarını başlatır
    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender); // Ücretleri toplayacak adres
        feePercent = _feePercent; // Pazarda alınacak ücret yüzdesi
    }

    // Yeni bir öğe listelemek için fonksiyon
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "fiyat 0 olmamalidir"); 
        itemCount ++;
        _nft.transferFrom(msg.sender, address(this), _tokenId); // ERC721 token'ı alıcıdan sözleşmeye transfer et
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        emit Offered( 
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

   
    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId); 
        Item storage item = items[_itemId]; 
        require(_itemId > 0 && _itemId <= itemCount, "nft mevcut degil"); 
        require(msg.value >= _totalPrice, "yeterli ETH yok"); 
        require(!item.sold, "nft satildi"); 
        item.seller.transfer(item.price); 
        feeAccount.transfer(_totalPrice - item.price); 
        item.sold = true; 
        item.nft.transferFrom(address(this), msg.sender, item.tokenId); // ERC721 token'ı alıcıya transfer et
        emit Bought( 
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }
}
