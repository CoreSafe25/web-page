// ================================
//  CoreSafe - Reporte.js
//  Manejo del formulario de creación de reportes
// ================================

// Seleccionamos el formulario
const form = document.querySelector("form");

const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

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

// Abrir selector al hacer click
uploadArea.addEventListener("click", () => fileInput.click());

// Cargar imagen seleccionada
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) showPreview(file);
});

// Drag & Drop
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");

  const file = e.dataTransfer.files[0];
  if (file) showPreview(file);
});

// Función para mostrar la imagen
function showPreview(file) {
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}
