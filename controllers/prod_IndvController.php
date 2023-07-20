<?php
require_once '../models/productoModel.php';

class ProductoController
{
  private $model;

  public function __construct()
  {
    $this->model = new Producto(); // Modelo
  }

  public function obtenerProducto($sku)
  {
    $producto = $this->model->obtenerProducto($sku);
    echo json_encode($producto);
  }
}

// Creando la instancia del controlador
$controlador = new ProductoController();

// Verificando el tipo de solicitud y llamar al método que corresponda
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sku = $_GET['sku'];
  $controlador->obtenerProducto($sku);
}
