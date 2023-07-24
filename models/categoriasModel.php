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
    try {
      $query = $this->db->prepare('SELECT * FROM categorias');
      $query->execute();
      return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      $error = array("error" => "Error al obtener categorías: " . $e->getMessage());
      return $error;
    }
  }

  public function agregarCategoria($concepto, $descripcion)
  {
    try {
      $query = $this->db->prepare('INSERT INTO categorias (concepto, descripcion) VALUES (?, ?)');
      $query->execute([$concepto, $descripcion]);
      return $query->rowCount();
    } catch (PDOException $e) {
      $error = array("error" => "Error al agregar categoría: " . $e->getMessage());
      return $error;
    }
  }
}
