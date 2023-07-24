function agregarCategoria(concepto, descripcion) {
  return fetch(urlCatController, {
    method: 'POST',
    body: new URLSearchParams({
      concepto: concepto,
      descripcion: descripcion
    })
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    })
}