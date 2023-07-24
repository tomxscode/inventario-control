let tablaContenedor = document.getElementById('items-tabla');
let formProductos = document.getElementById('formProductos');
let edicion = false, skuEdicion = 0;
let btnRecargar = document.getElementById('btnRecargar');

btnRecargar.addEventListener('click', function (event) {
  event.preventDefault();
  cargarInformacion();
  agregarAlerta('El contenido fue recargado con éxito', 'info');
})

document.addEventListener('DOMContentLoaded', function (event) {
  // Establecer edicion en false
  edicion = false;
  // Cargado de items
  cargarInformacion();

  // Comprobación del input SKU
  const skuInput = document.querySelector('input[name="sku"]');
  const charCountElement = document.getElementById("charCount");
  const errorSKU = document.getElementById("errorSKU");

  function updateCharCount() {
    const skuValue = skuInput.value.trim(); // Obtener el valor del SKU eliminando espacios en blanco
    const maxLenght = 6; // Longitud máxima del SKU
    const charCount = skuValue.length;

    // Actualizar el texto del contador
    charCountElement.textContent = `${charCount}/${maxLenght}`;
  }

  skuInput.addEventListener('input', function () {
    const skuValue = skuInput.value.trim();
    const maxLenght = 6;
    if (skuValue.length > maxLenght) {
      errorSKU.textContent = "El SKU no puede tener más de 6 carácteres";
      skuInput.value = skuValue.slice(0, maxLenght);
    } else {
      errorSKU.textContent = "";
    }
    updateCharCount();
  })
})

function cargarInformacion() {
  // Antes de que obtenga los productos, limpiamos la tabla
  tablaContenedor.innerHTML = "";
  const items = cargarProductos()
    .then(data => {
      // Por cada vuelta en data, nos dará la info de un producto
      data.forEach(producto => {
        tablaContenedor.innerHTML += `
        <tr>
        <td>${producto.sku}</td>
        <td>${producto.detalle}</td>
        <td>${producto.existencias}</td>
        <td>
          <button class="btn btn-danger" onclick="prepararEliminacion('${producto.sku}')">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="btn btn-success" onclick="prepararEdicion('${producto.sku}')">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </td>
        </tr>`
      });
    })
    .catch(error => {
      console.error(error)
    })
}

function prepararEdicion(sku) {
  edicion = true;
  formProductos.modificar.disabled = false;
  obtenerProducto(sku)
    .then(data => {
      formProductos.sku.value = data.sku;
      skuEdicion = data.sku;
      formProductos.sku.disabled = true;
      formProductos.detalle.value = data.detalle;
      formProductos.descripcion.value = data.descripcion;
      formProductos.existencias.value = data.existencias;
      formProductos.enviar.disabled = true;
    })
    .catch(error => {
      console.error(error);
    })
}

function prepararEliminacion(sku) {
  borrarProducto(sku)
    .then(data => {
      if (data === 1) {
        agregarAlerta(`El producto "${sku}" fue eliminado con éxito`, 'success');
      } else {
        agregarAlerta(`El producto "${sku}" no logró ser eliminado`, 'danger');
      }
    })
    .catch(error => {
      agregarAlerta(`Ocurrió un error al intentar eliminar el producto, error: ${error}`, 'warning');
    })
}

// Acción al enviar el formulario
formProductos.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  // Objeto para almacenar los valores
  const valores = {};
  for (let par of formData.entries()) {
    valores[par[0]] = par[1];
  }
  if (!edicion) {
    // Agregado del producto
    agregarProducto(
      valores['sku'],
      valores['detalle'],
      valores['descripcion'],
      valores['existencias']
    )
      .then(data => {
        if (data) {
          agregarAlerta(`El producto "${valores['detalle']}" fue agregado éxitosamente`, 'success');
        } else {
          agregarAlerta('El producto no pudo ser agregado', 'danger');
        }
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    editarProducto(
      skuEdicion,
      valores['detalle'],
      valores['descripcion'],
      valores['existencias']
    )
      .then(data => {
        if (data == 1) {
          agregarAlerta('El producto fue modificado con éxito', 'success');
        } else {
          agregarAlerta('No se pudo modificar el producto, revisa la integridad de los campos', 'danger');
        }
        // Reseteo tras respuesta
        formProductos.sku.disabled = false;
        formProductos.reset();
        edicion = false;
        formProductos.enviar.disabled = false;
        formProductos.modificar.disabled = true;
      })
      .catch(error => {
        agregarAlerta('Hubo un error al modificar el producto (' + error + ')', 'warning');
      })
  }

})