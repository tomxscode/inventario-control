let tablaContenedor = document.getElementById('items-tabla');
let formProductos = document.getElementById('formProductos');

document.addEventListener('DOMContentLoaded', function (event) {
  // Cargado de items
  const items = cargarProductos()
    .then(data => {
      // Por cada vuelta en data, nos dará la info de un producto
      data.forEach(producto => {
        tablaContenedor.innerHTML += `
        <tr>
        <td>${producto.sku}</td>
        <td>${producto.detalle}</td>
        <td>${producto.existencias}</td>
        </tr>`
      });
    })
    .catch(error => {
      console.error(error)
    })
})

// Acción al enviar el formulario
formProductos.addEventListener('submit', function (event) {
  event.preventDefault();
  // Agregado del producto
  const form = event.target;
  const formData = new FormData(form);
  // Objeto para almacenar los valores
  const valores = {};
  for (let par of formData.entries()) {
    valores[par[0]] = par[1];
  }

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
})