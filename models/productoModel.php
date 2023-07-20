<?php
class Producto
{
  private $db; // Base de datos

  public function __construct()
  {
    // Establecer la conexión a la base de datos
    $this->db = new PDO('mysql:host=localhost;dbname=inventario_control', 'root', '');
  }

  public function obtenerProductos()
  {
    $query = $this->db->prepare('SELECT * FROM productos');
    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
  }

  public function obtenerProducto($sku)
  {
    $query = $this->db->prepare('SELECT * FROM productos WHERE sku = ?');
    $query->execute([$sku]);
    return $query->fetch(PDO::FETCH_ASSOC);
  }

  public function agregarProducto($sku, $detalle, $descripcion, $existencias)
  {
    $query = $this->db->prepare('INSERT INTO productos (sku, detalle, descripcion, existencias) VALUES (?, ?, ?, ?)');
    $query->execute([$sku, $detalle, $descripcion, $existencias]);
    return $query->rowCount();
  }

  public function borrarProducto($sku)
  {
    $query = $this->db->prepare('DELETE FROM productos WHERE sku = ?');
    $query->execute([$sku]);
    return $query->rowCount();
  }

  public function editarProducto($sku, $detalle, $descripcion, $existencias)
  {
    $query = $this->db->prepare('UPDATE productos SET detalle = ?, descripcion = ?, existencias = ? WHERE sku = ?');
    $query->execute([$detalle, $descripcion, $existencias, $sku]);
    return $query->rowCount();
  }
}
