package com.safalifter.auction.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"offers"})
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private String nft;
    private boolean sold;
    private Double sellPrice;
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Offer> offers;

}