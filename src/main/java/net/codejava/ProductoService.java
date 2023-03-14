package net.codejava;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {
	@Autowired
	private ProductoRepository repo;
	
	public List<Producto> listAll() {
		return repo.findAll();
	}
	
	public void save(Producto producto) {
		repo.save(producto);
	}
	
	public Producto get(Long id) {
		return repo.findById(id).get();
	}
	
	public void delete(Long id) {
		repo.deleteById(id);
	}
	
	public List<Producto> getByMarca(String marca) {
		return repo.findByMarcaContaining(marca);
	}
	
	public List<Producto> getByPrecioDesc() {
		return repo.findByOrderByPrecioDesc();
	}
}
