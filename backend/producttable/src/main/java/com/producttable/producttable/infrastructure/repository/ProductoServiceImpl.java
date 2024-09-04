package com.producttable.producttable.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.producttable.producttable.application.service.ProductoService;
import com.producttable.producttable.domain.entity.Producto;


@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public ProductoServiceImpl (ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Producto> findById(String id) {
        return productoRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Producto> delete(String id) {
        Optional<Producto> producto = productoRepository.findById(id);
        producto.ifPresent(productoExists -> {
            productoRepository.delete(productoExists);
        });
        return producto;
    }
}
