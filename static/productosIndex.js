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

})