package com.safalifter.auction.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class OfferDto {
    private UUID id;
    private Long userId;
    private String productId;
    private Double offeredPrice;
}
