function agregarAlerta(contenido, tipo) {
  const alertas = document.getElementById('alertas');

  const alerta = document.createElement('div');
  alerta.classList.add('alert', `alert-${tipo}`);
  alerta.textContent = contenido;
  alertas.appendChild(alerta);

  // Establecer el tiempo en milisegundos después del cual se eliminará la alerta (por ejemplo, 5000 ms = 5 segundos)
  const tiempoDesaparicion = 5000;

  // Programar la eliminación de la alerta después de X cantidad de segundos
  setTimeout(() => {
    alerta.remove();
  }, tiempoDesaparicion);
}