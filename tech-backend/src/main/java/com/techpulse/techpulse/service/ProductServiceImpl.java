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
}
