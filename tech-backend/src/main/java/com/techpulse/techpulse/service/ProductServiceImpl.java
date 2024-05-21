package com.techpulse.techpulse.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techpulse.techpulse.model.Product;
import com.techpulse.techpulse.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
    
    @Autowired
    private ProductRepository pr;
    
    public Product saveProduct(Product product)
    {
        return pr.save(product);
    }

    public List<Product> getAllProducts()
    {
        return pr.findAll();
    }
    
    public void deleteProduct(int id)
    {
        pr.deleteById(id);
    }

    public void updateProduct(int id, Product product)
    {
        Product existingProduct = pr.findById(id).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        if (product.getName() != null) {existingProduct.setName(product.getName());}
        if (product.getBrand() != null) {existingProduct.setBrand(product.getBrand());}
        if (product.getCategory() != null) {existingProduct.setCategory(product.getCategory());}
        if (product.getDescription() != null) {existingProduct.setDescription(product.getDescription());}
        if (product.getBrand() != null) {existingProduct.setBrand(product.getBrand());}
        pr.save(existingProduct);
    }
}
