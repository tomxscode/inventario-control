<?php
require_once '../models/productoModel.php';

class ProductoController
{
  private $model;

  public function __construct()
  {
    $this->model = new Producto(); // Modelo
  }

  public function obtenerProductos()
  {
    $productos = $this->model->obtenerProductos();
    echo json_encode($productos);
  }

  public function agregarProducto($sku, $detalle, $descripcion, $existencias)
  {
    $producto = $this->model->agregarProducto($sku, $detalle, $descripcion, $existencias);
    echo json_encode($producto);
  }

  public function editarProducto($sku, $detalle, $descripcion, $existencias)
  {
    $producto = $this->model->editarProducto($sku, $detalle, $descripcion, $existencias);
    echo json_encode($producto);
  }

  public function borrarProducto($sku)
  {
    $productoEliminado = $this->model->borrarProducto($sku);
    echo json_encode($productoEliminado);
  }
}

// Creando la instancia del controlador
$controlador = new ProductoController();

// Verificando el tipo de solicitud y llamar al método que corresponda
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $controlador->obtenerProductos();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Atributos enviados
  $sku = $_POST['sku'];
  $detalle = $_POST['detalle'];
  $descripcion = $_POST['descripcion'];
  $existencias = $_POST['existencias'];
  // Llamando al controlador
  $controlador->agregarProducto($sku, $detalle, $descripcion, $existencias);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // Obteniendo la información. Nativamente no podemos recibir PUT, entonces, usamos esto:
  parse_str(file_get_contents("php://input"), $putInfo);
  $sku = $putInfo['sku'];
  $detalle = $putInfo['detalle'];
  $descripcion = $putInfo['descripcion'];
  $existencias = $putInfo['existencias'];
  // Llamando al controlador
  $controlador->editarProducto($sku, $detalle, $descripcion, $existencias);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $sku = $_GET['sku'];
  $controlador->borrarProducto($sku);
}
