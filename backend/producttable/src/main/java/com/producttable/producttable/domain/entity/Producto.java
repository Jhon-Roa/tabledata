    package com.producttable.producttable.domain.entity;

    import java.math.BigDecimal;

    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;
    import jakarta.validation.constraints.Min;
    import jakarta.validation.constraints.NotNull;
    import jakarta.validation.constraints.Size;

    @Entity
    @Table(name = "Producto", schema = "public")
    public class Producto {
        
        @Id
        @Size(max = 25)
        private String code;

        @NotNull
        @Size(max = 50)
        private String name;

        @NotNull
        @Min(100)
        @Column(precision = 10, scale = 2)
        private BigDecimal price;

        @Min(0)
        private Integer stock;

        public Producto() {
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }

        public Integer getStock() {
            return stock;
        }

        public void setStock(Integer stock) {
            this.stock = stock;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }

        
    }
