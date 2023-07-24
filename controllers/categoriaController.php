<?php
require_once '../models/categoriasModel.php';

class CategoriaController
{
  private $model;

  public function __construct()
  {
    $this->model = new Categoria();
  }

  public function obtenerCategorias()
  {
    $categorias = $this->model->obtenerCategorias();
    echo json_encode($categorias);
  }

  public function agregarCategoria($concepto, $descripcion)
  {
    $categoria = $this->model->agregarCategoria($concepto, $descripcion);
    echo json_encode($categoria);
  }
}

// Creando controlador
$controlador = new CategoriaController();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $concepto = $_POST['concepto'];
  $descripcion = $_POST['descripcion'];
  $controlador->agregarCategoria($concepto, $descripcion);
}
