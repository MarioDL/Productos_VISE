$(document).ready(function () {
	var tableProductos
	var datos_tableProductos
	const urlApi = 'http://localhost:8080/api/producto'
	var lenguaje = $('#lang').text();
	
	seleccionarIdioma()
	getProductos()
	
	// Cuando de muestra el modal se limpian todos los datos de los campos
    $('#addProducto').on('show.bs.modal', function(e) {
        $(e.currentTarget).find('input[id="addNombre"]').val('');
        $(e.currentTarget).find('input[id="addMarca"]').val('');
        $(e.currentTarget).find('input[id="addHechoEn"]').val('');
        $(e.currentTarget).find('input[id="addPrecio"]').val('');
    });
    
    $('#btnAgregarProducto').click(function() {  
		addProducto()
	})
	
	$('#btnCloseAgregarProducto').click(function() {  
		$("#addProducto").modal('hide')
	})
	
	// Guardar datos del reglon seleccionado cuándo se da click en el botón "Editar" de la tabla
    $('#table1').on( 'click', '#btnEdit', function (e) {
        var data = tableProductos.row( $(this).parents('tr') ).data();
        datos_tableProductos = data;
    });
	
	// Guardar datos del reglon seleccionado cuándo se da click en el botón "Eliminar" de la tabla
    $('#table1').on( 'click', '#btnDelete', function (e) {
        var data = tableProductos.row( $(this).parents('tr') ).data();
        datos_tableProductos = data;
        deleteProducto()
    });
	
	// Cuando de muestra el modal se cargan todos los datos del producto seleccionado
    $('#editProducto').on('shown.bs.modal', function(e) {
		$(this).find('#editId').focus();
		$(e.currentTarget).find('input[id="editId"]').val(datos_tableProductos.id)
        $(e.currentTarget).find('input[id="editNombre"]').val(datos_tableProductos.nombre)
        $(e.currentTarget).find('input[id="editMarca"]').val(datos_tableProductos.marca)
        $(e.currentTarget).find('input[id="editHechoEn"]').val(datos_tableProductos.hechoen)
        $(e.currentTarget).find('input[id="editPrecio"]').val(datos_tableProductos.precio)
    });
    
    $('#btnEditarProducto').click(function() {  
		updateProducto()
	})
	
	$('#btnCloseEditarProducto').click(function() {  
		$('#editId').val('')
		$('#editNombre').val('')
		$('#editMarca').val('')
		$('#editHechoEn').val('')
		$('#editPrecio').val('')
		$("#editProducto").modal('hide')
	})
	
	//Buscar producto por marca
	$('#btnBuscarMarca').click(function() {
		$('#searchPrecioMayor').prop('checked', false)
		var marca = $('#searchMarca').val()
		getProductosPorMarca(marca)
	})
	
	//Buscar producto por precio desc
	$('#searchPrecioMayor').change(function() {
		$('#searchMarca').val('')
		if(this.checked) {
      		getProductosPorprecioDesc()
    	}
    	else {
			getProductos()
		}
  	})
  	
  	//Cambiar idioma
    $("#idiomas").change(function () {
        var selectedOption = $('#idiomas').val()
        if (selectedOption != ''){
			window.location.replace('/?lang=' + selectedOption)
        }
    })
    
    function seleccionarIdioma() {
		$("#idiomas option[value="+ lenguaje +"]").attr("selected",true);
	}
    
	
	function getProductos() {
		fetch(urlApi,{
			method: 'GET'
		})
		.then(response => response.json() )
		.then(data => {
			llenarTablaProductos(data)					
		});
	}
	
	function addProducto() {
		if (!validarCamposAdd()) {
			return
		}
		
		var producto = {
			nombre : $('#addNombre').val(),
			marca : $('#addMarca').val(),
			hechoen : $('#addHechoEn').val(),
			precio : parseFloat($('#addPrecio').val())
		}
		
		fetch(urlApi + '/create',{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(producto)
		})
		.then(response => response.json() )
		.then(data => {
			if(data == true) {
				$("#addProducto").modal('hide')
				Swal.fire({
					icon: 'success',
				  	title: 'Producto guardado correctamente'
			  	})
				getProductos()
			}
			else {
				Swal.fire({
				  icon: 'error',
				  title: 'Error al guardar el producto',
				  text: 'Verifique que ingreso toda la información correctamente e intente de nuevo'
				})
			}
			
		});
	}
	
	function updateProducto() {
		if (!validarCamposEdit()) {
			return
		}
		
		var producto = {
			id: datos_tableProductos.id,
			nombre : $('#editNombre').val(),
			marca : $('#editMarca').val(),
			hechoen : $('#editHechoEn').val(),
			precio : parseFloat($('#editPrecio').val())
		}
		
		fetch(urlApi + '/update',{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(producto)
		})
		.then(response => response.json() )
		.then(data => {
			if(data == true) {
				$("#editProducto").modal('hide')
				Swal.fire({
					icon: 'success',
				  	title: 'Producto editado correctamente'
			  	})
				getProductos()
			}
			else {
				Swal.fire({
				  icon: 'error',
				  title: 'Error al editar el producto',
				  text: 'Verifique que ingreso toda la información correctamente e intente de nuevo'
				})
			}
			
		});
	}
	
	function deleteProducto() {
		Swal.fire({
		  title: '¿Desea realmente eliminar el producto?',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#198754',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Confirmar',
		  cancelButtonText: 'Cancelar'
		}).then((result) => {
		  if (result.isConfirmed) {
			var id = parseInt(datos_tableProductos.id)
			var urlDelete = urlApi + '/delete/'+id
			
			fetch(urlDelete,{
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				}
			})
			.then(response => response.json() )
			.then(data => {
				if(data == true) {
					Swal.fire(
						'Producto eliminado',
						'El producto ha sido eliminado',
						'success'
				    )
					getProductos()
				}
				else {
					Swal.fire({
					  icon: 'error',
					  title: 'Error al eliminar el producto',
					  text: 'Ocurrió un error inesperado'
					})
				}
				
			});
		  }
		  else {
			  return
		  }
		})
	}
	
	function getProductosPorMarca(marca) {
		var urlProductoMarca = urlApi + '/getByMarca?marca='+marca
		fetch(urlProductoMarca,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then(response => response.json() )
		.then(data => {
			llenarTablaProductos(data)				
		});
	}
	
	function getProductosPorprecioDesc() {
		fetch(urlApi + '/precioDesc',{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then(response => response.json() )
		.then(data => {
			llenarTablaProductos(data)
		});
	}
	
	function validarCamposAdd() {
		if($('#addNombre').val() == '') {
			alertaValidaCamposAdd()
			return false
		}
		
		if($('#addMarca').val() == '') {
			alertaValidaCamposAdd()
			return false
		}
		
		if($('#addHechoEn').val() == '') {
			alertaValidaCamposAdd()
			return false
		}
		
		if($('#addPrecio').val() == '') {
			alertaValidaCamposAdd()
			return false
		}
		return true
	}
	
	function alertaValidaCamposAdd() {
		Swal.fire({
			icon: 'error',
			title: 'Es necesario llenar todos los campos para guardar el producto',
			confirmButtonText: 'Aceptar',
		})
	}
	
	function validarCamposEdit() {
		if($('#editNombre').val() == '') {
			alertaValidaCamposEdit()
			return false
		}
		
		if($('#editMarca').val() == '') {
			alertaValidaCamposEdit()
			return false
		}
		
		if($('#editHechoEn').val() == '') {
			alertaValidaCamposEdit()
			return false
		}
		
		if($('#editPrecio').val() == '') {
			alertaValidaCamposEdit()
			return false
		}
		return true
	}
	
	function alertaValidaCamposEdit() {
		Swal.fire({
			icon: 'error',
			title: 'Es necesario llenar todos los campos para editar el producto',
			confirmButtonText: 'Aceptar',
		})
	}
	
	function llenarTablaProductos(data) {
		$("#table1").dataTable().fnDestroy();
		$('#table1 thead th').css('text-align', 'center')
	    tableProductos = $('#table1').DataTable({
	        data: data,
	        columns: [
	            { data: 'id' },
	            { data: 'nombre' },
	            { data: 'marca' },
	            { data: 'hechoen' },
	            { data: 'precio' },
	        ],
	        'columnDefs': [
				{
					"targets": 5,
	                "data": data,
	                "className": "text-center",
	                'render': function(data, type, row, meta) 
	                { 
	                    data ="<button class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editProducto' id='btnEdit'><i class='bi bi-pencil-square'></i> Editar</button>&nbsp;&nbsp;&nbsp;<button class='btn btn-danger btn-sm' id='btnDelete'><i class='bi bi-trash3'></i> Eliminar</button>" 
	                    return data;
	                }
            	},
            	{
					"targets": "_all",
					"orderable": false,
					"className": "text-center"
				},
			],
			order: [],
    		ordering: false,
    		searching: false,
    		paging: false,
    		info: false
	    });
	}
})