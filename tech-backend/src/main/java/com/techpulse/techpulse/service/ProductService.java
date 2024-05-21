package com.techpulse.techpulse.service;

import java.util.List;

import com.techpulse.techpulse.model.Product;

public interface ProductService {
    public Product saveProduct(Product product);
    public List<Product> getAllProducts();
}
