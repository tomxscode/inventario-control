// CONSTANTES
const urlMadre = "http://localhost";
// URLS
const urlProdContoller = urlMadre + "/inventario-control/controllers/productoController.php";

// FUNCIONES
const alertas = document.getElementById('alertas');
function agregarAlerta(contenido, tipo, clases) {
  alertas.innerHTML += `
  <div class="alert alert-${tipo} ${clases ?? ""}">${contenido}</div>`;
}