package com.safalifter.auction.service;


import com.safalifter.auction.dto.ProductDto;
import com.safalifter.auction.exc.InvalidOfferException;
import com.safalifter.auction.model.Offer;
import com.safalifter.auction.model.Product;
import com.safalifter.auction.repository.OfferRepository;
import com.safalifter.auction.request.OfferRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OfferService {
    private final OfferRepository offerRepository;
    private final UserService userService;
    private final ProductService productService;
    private final ModelMapper mapper;

    @Transactional
    public void makeAnOffer(OfferRequest request) {
        Product offeredProduct = productService.getProductById(request.getId());
        Double finalOffer = getHighestOffer(offeredProduct.getId());
        if (request.getOfferedPrice() > finalOffer) {
            Offer offer = Offer.builder()
                    .product(offeredProduct)
                    .offeredPrice(request.getOfferedPrice())
                    .id(UUID.randomUUID()).build();
            offerRepository.save(offer);
        } else {
            throw new InvalidOfferException("Bid higher! Last bid: " + finalOffer);
        }
    }

    public Double getHighestOffer(String productId) {
        Product product = productService.getProductById(productId);
        return product.getOffers().stream().mapToDouble(Offer::getOfferedPrice).max().orElse(product.getPrice());
    }

    public ProductDto buyWithLastBid(String id) {
        Product product = productService.getProductById(id);
        Double highestOffer = getHighestOffer(id);
        product.setSold(true);
        product.setSellPrice(highestOffer);
        productService.update(product);
        return mapper.map(product, ProductDto.class);
    }
}
