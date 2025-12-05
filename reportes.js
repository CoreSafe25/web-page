// ================================
//  CoreSafe - Reporte.js
//  Manejo del formulario de creación de reportes
// ================================

// Selección de elementos
const form = document.querySelector("form");
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

// ================================
//  VALIDACIÓN DEL FORMULARIO
// ================================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const type = document.getElementById("type-problem").value;
  const urgency = document.getElementById("lvl-problem").value;
  const description = document.getElementById("description").value.trim();
  const direction = document.getElementById("direction").value.trim();

  // Aquí corregimos: validamos la imagen desde fileInput
  const multimedia = fileInput.files[0];

  // Validación
  if (!title || !type || !urgency || !description || !multimedia || !direction) {
    alert("Por favor complete todos los campos antes de continuar.");
    return;
  }

  // Crear reporte simulado
  const newReport = {
    titulo: title,
    tipo: type,
    urgencia: urgency,
    descripcion: description,
    evidencia: multimedia.name,
    direccion: direction,
    fecha: new Date().toLocaleDateString(),
  };

  console.log("📌 Reporte generado:", newReport);

  alert("✅ ¡Reporte enviado exitosamente! Gracias por colaborar con CoreSafe.");

  form.reset();
  preview.style.display = "none";
});

// ================================
//  MANEJO DE IMAGENES
// ================================

// Click abre selector
uploadArea.addEventListener("click", () => fileInput.click());

// Vista previa
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) showPreview(file);
});

// Drag & drop
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
  if (file) {
    fileInput.files = e.dataTransfer.files;
    showPreview(file);
  }
});

// Mostrar imagen
function showPreview(file) {
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}
