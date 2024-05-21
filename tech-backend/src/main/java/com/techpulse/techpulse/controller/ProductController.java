package com.techpulse.techpulse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techpulse.techpulse.model.Product;
import com.techpulse.techpulse.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService ps;

    @PostMapping("/create")
    public String save(@RequestBody Product product)
    {
        ps.saveProduct(product);
        return "Product saved sucessfully!";
    }

    @GetMapping("/getAll")
    public List<Product> getAll()
    {
        return ps.getAllProducts();
    }
}
