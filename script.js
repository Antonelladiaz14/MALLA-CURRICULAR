// Obtener ramos y cargar estado guardado
document.addEventListener("DOMContentLoaded", () => {
  const ramos = Array.from(document.querySelectorAll(".ramo"));

  // Cargar estado guardado de localStorage
  const aprobadoGuardado = JSON.parse(localStorage.getItem("ramosAprobados")) || [];

  // Marcar aprobados al cargar
  ramos.forEach(ramo => {
    if (aprobadoGuardado.includes(ramo.dataset.nombre)) {
      marcarAprobado(ramo);
    }
  });

  // Actualizar bloqueo de ramos según prerrequisitos
  actualizarBloqueos();

  // Evento click para marcar o desmarcar aprobado
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return; // no hace nada si está bloqueado

      if (ramo.classList.contains("aprobado")) {
        desmarcarAprobado(ramo);
      } else {
        marcarAprobado(ramo);
      }

      actualizarBloqueos();
      guardarEstado();
    });
  });
});

function marcarAprobado(ramo) {
  ramo.classList.add("aprobado");
  ramo.classList.remove("bloqueado");
}

function desmarcarAprobado(ramo) {
  ramo.classList.remove("aprobado");
}

function actualizarBloqueos() {
  const ramos = Array.from(document.querySelectorAll(".ramo"));
  const aprobados = ramos.filter(r => r.classList.contains("aprobado")).map(r => r.dataset.nombre);

  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prerequisito;
    if (prereq) {
      // Si el prerrequisito no está aprobado, bloqueo el ramo
      if (!aprobados.includes(prereq)) {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
      } else {
        ramo.classList.remove("bloqueado");
      }
    }
  });
}

function guardarEstado() {
  const ramos = Array.from(document.querySelectorAll(".ramo"));
  const aprobados = ramos.filter(r => r.classList.contains("aprobado")).map(r => r.dataset.nombre);
  localStorage
