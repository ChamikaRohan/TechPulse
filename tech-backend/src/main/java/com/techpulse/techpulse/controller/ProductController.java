package com.techpulse.techpulse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techpulse.techpulse.model.Product;
import com.techpulse.techpulse.service.ProductService;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService ps;

    @PostMapping("/create-one")
    public String saveOne(@RequestBody Product product)
    {
        ps.saveProduct(product);
        return "Product saved sucessfully!";
    }

    @GetMapping("/get-all")
    public List<Product> getAll()
    {
        return ps.getAllProducts();
    }

    @DeleteMapping("/delete-one/{id}")
    public String deleteOne(@PathVariable int id)
    {
        ps.deleteProduct(id);
        return "Product deleted sucessfully!";
    }

    @PutMapping("/update-one/{id}")
    public String updateOne(@PathVariable int id, @RequestBody Product product)
    {
        ps.updateProduct(id, product);
        return "Product updated sucessfully!";
    }
}
