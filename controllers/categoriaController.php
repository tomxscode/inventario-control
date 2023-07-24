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
