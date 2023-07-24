<?php
class Categoria
{
  private $db;

  public function __construct()
  {
    // Base de datos
    $this->db = new PDO('mysql:host=localhost;dbname=inventario_control', 'root', '');
  }

  public function obtenerCategorias()
  {
    $query = $this->db->prepare('SELECT * FROM categorias');
    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
  }

  public function agregarCategoria($concepto, $descripcion)
  {
    $query = $this->db->prepare('INSERT INTO categorias (concepto, descripcion) VALUES (?, ?)');
    $query->execute([$concepto, $descripcion]);
    return $query->rowCount();
  }
}
