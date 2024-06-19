package com.safalifter.auction.repository;

import com.safalifter.auction.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
}
