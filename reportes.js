// ================================
//  CoreSafe - Reporte.js
//  Manejo del formulario de creación de reportes
// ================================

// Seleccionamos el formulario
const form = document.querySelector("form");

// Evento principal
form.addEventListener("submit", function (e) {
  e.preventDefault(); // evita recargar la página

  // Obtenemos valores del formulario
  const title = document.getElementById("title").value.trim();
  const type = document.getElementById("type-problem").value;
  const urgency = document.getElementById("lvl-problem").value;
  const description = document.getElementById("description").value.trim();
  const multimedia = document.getElementById("multimedia").value.trim();
  const direction = document.getElementById("direction").value.trim();

  // Validación simple
  if (!title || !type || !urgency || !description || !multimedia || !direction) {
    alert("Por favor complete todos los campos antes de continuar.");
    return;
  }

  // Simulación de guardado (puedes reemplazar por API o localStorage)
  const newReport = {
    titulo: title,
    tipo: type,
    urgencia: urgency,
    descripcion: description,
    evidencia: multimedia,
    direccion: direction,
    fecha: new Date().toLocaleDateString(),
  };

  console.log("📌 Reporte generado:", newReport);

  // Confirmación al usuario
  alert("✅ ¡Reporte enviado exitosamente! Gracias por colaborar con CoreSafe.");

  // Limpia el formulario
  form.reset();

  // Opcional: redireccionar al panel de reportes
  // window.location.href = "PanelAutoridades_Empresa.html";
});

// ================================
//  Extra: Aviso cuando se selecciona archivo
// ================================
const evidenciaInput = document.getElementById("multimedia");

evidenciaInput.addEventListener("change", function () {
  if (evidenciaInput.value) {
    alert("📎 Archivo seleccionado correctamente.");
  }
});
