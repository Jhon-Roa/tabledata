package com.producttable.producttable.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.producttable.producttable.domain.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, String> {
    
}
