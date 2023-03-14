package net.codejava;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
	List<Producto> findByMarcaContaining(String marca);
	List<Producto> findByOrderByPrecioDesc();
}
