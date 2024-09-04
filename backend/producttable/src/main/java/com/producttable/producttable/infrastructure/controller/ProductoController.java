package com.producttable.producttable.infrastructure.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.producttable.producttable.domain.entity.Producto;
import com.producttable.producttable.infrastructure.repository.ProductoServiceImpl;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4173")
@RequestMapping("api/productos")
public class ProductoController {
    @Autowired
    private ProductoServiceImpl productoServiceImpl;

    @GetMapping
    public List<Producto> listProducts() {
        return productoServiceImpl.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productoServiceImpl.delete(id);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@Valid @RequestBody Producto producto, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(productoServiceImpl.save(producto));
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
