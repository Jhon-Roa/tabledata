package com.producttable.producttable.application.service;

import java.util.List;
import java.util.Optional;

import com.producttable.producttable.domain.entity.Producto;

public interface ProductoService {
    Producto save(Producto producto);
    List<Producto> findAll();
    Optional<Producto> delete(String id);
    Optional<Producto> findById(String id);
}
