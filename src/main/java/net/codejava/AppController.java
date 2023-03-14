package net.codejava;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AppController {
	@Autowired
	private ProductoService servicio;
	
	@RequestMapping("/")
	public String viewHomePage(Model model) {
//		List<Producto> listProductos = servicio.listAll();
		Locale locale = LocaleContextHolder.getLocale();
		model.addAttribute("locale", locale);
		return "index";
	}
	
	@RequestMapping("/new")
	public String showNewProductPage(Model model) {
	    Producto producto = new Producto();
	    model.addAttribute("producto", producto);
	     
	    return "Nuevo_Producto";
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String saveProduct(@ModelAttribute("producto") Producto producto) {
	    servicio.save(producto);
	     
	    return "redirect:/";
	}
	
	@RequestMapping("/edit/{id}")
	public ModelAndView showEditProductPage(@PathVariable(name = "id") Long id) {
	    ModelAndView mav = new ModelAndView("Editar_Producto");
	    Producto producto = servicio.get(id);
	    mav.addObject("producto", producto);
	     
	    return mav;
	}
	
	@RequestMapping("/delete/{id}")
	public String deleteProduct(@PathVariable(name = "id") Long id) {
	    servicio.delete(id);
	    return "redirect:/";       
	}
}
