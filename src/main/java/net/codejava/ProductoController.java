package net.codejava;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {
	@Autowired
	private ProductoService servicio;
	
	@GetMapping
	public List<Producto> getListProductos() {
		List<Producto> listProductos = servicio.listAll();
		return listProductos;
	}
	
	@PostMapping("/create")
	public boolean addProducto(@Validated @RequestBody Producto producto) {
		boolean response;
		try {
			servicio.save(producto);
			response = true;
		} catch (Exception e) {
			response = false;
		}
		return response;
	}
	
	@PostMapping("/update")
	public boolean updateProducto(@Validated @RequestBody Producto producto) {
		boolean response;
		try {
			servicio.save(producto);
			response = true;
		} catch (Exception e) {
			response = false;
		}
		return response;
	}
	
	@PostMapping("/delete/{id}")
	public boolean deleteProducto(@PathVariable(name = "id") Long id) {
		boolean response;
		try {
			servicio.delete(id);
			response = true;
		} catch (Exception e) {
			response = false;
		}
		return response;
	}
	
	@GetMapping(value = "/getByMarca", params="marca")
	public List<Producto> getByMarca(@RequestParam String marca) {
		List<Producto> lstProductosByMarca = servicio.getByMarca(marca);
		return lstProductosByMarca;
	}
	
	@GetMapping("/precioDesc")
	public List<Producto> getByPrecioDesc() {
		List<Producto> listProductos = servicio.getByPrecioDesc();
		return listProductos;
	}
}
