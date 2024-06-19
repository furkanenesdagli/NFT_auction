package com.safalifter.auction.dto;

import lombok.Data;

import java.util.Set;

@Data
public class ProductDto {
    private String id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private String nft;
    private boolean sold;
    private Double sellPrice;
    private Set<OfferDto> offers;
}
