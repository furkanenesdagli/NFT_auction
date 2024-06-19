package com.safalifter.auction.controller;

import com.safalifter.auction.dto.ProductDto;
import com.safalifter.auction.request.OfferRequest;
import com.safalifter.auction.request.ProductAddRequest;
import com.safalifter.auction.service.OfferService;
import com.safalifter.auction.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ModelMapper modelMapper;
    private final OfferService offerService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    ResponseEntity<ProductDto> addProduct(@RequestBody ProductAddRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(productService.addProduct(request), ProductDto.class));
    }

    @GetMapping
    ResponseEntity<List<ProductDto>> getProducts() {
        return ResponseEntity.ok(productService.getProducts().stream()
                .map(x -> modelMapper.map(x, ProductDto.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    ResponseEntity<ProductDto> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(modelMapper.map(productService.getProductById(id), ProductDto.class));
    }

    @PostMapping("/bid")
    public ResponseEntity<Void> offerEndPoint(@RequestBody OfferRequest request) {
        offerService.makeAnOffer(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/buy/{id}")
    public ResponseEntity<ProductDto> buyWithLastBid(@PathVariable String id) {
        return ResponseEntity.ok(offerService.buyWithLastBid(id));
    }

    @GetMapping("/lastBid/{id}")
    ResponseEntity<Double> getLastBidByProductId(@PathVariable String id) {
        return ResponseEntity.ok(offerService.getHighestOffer(id));
    }
}
