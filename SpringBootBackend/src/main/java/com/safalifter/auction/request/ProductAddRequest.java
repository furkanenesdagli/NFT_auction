package com.safalifter.auction.request;

import lombok.Getter;


@Getter
public class ProductAddRequest {
    private String id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private String nft;
}
