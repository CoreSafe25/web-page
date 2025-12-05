// ---------- Selección de estrellas ----------
const starElements = document.querySelectorAll('.stars-selector span');
let selectedRating = 0;

starElements.forEach(star => {
  star.addEventListener('click', () => {

    selectedRating = Number(star.dataset.value);

    // Quitar estado activo de todas
    starElements.forEach(s => s.classList.remove('active'));

    // Activar las estrellas hasta la seleccionada
    for (let i = 0; i < selectedRating; i++) {
      starElements[i].classList.add('active');
    }
  });
});

// ---------- Manejo del formulario ----------
const form = document.querySelector('.review-form');
const msg = document.querySelector('.submit-msg');
const textarea = document.querySelector('textarea');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validaciones
    if (selectedRating === 0) {
      alert("Por favor selecciona una calificación.");
      return;
    }

    if (!textarea || textarea.value.trim().length < 5) {
      alert("Escribe una opinión válida (mínimo 5 caracteres).");
      return;
    }

    // Mostrar mensaje de éxito
    if (msg) msg.style.display = "block";

    // Limpiar campos
    form.reset();
    starElements.forEach(s => s.classList.remove('active'));
    selectedRating = 0;

    // Ocultar el mensaje después de 3s
    setTimeout(() => {
      if (msg) msg.style.display = "none";
    }, 3000);
  });
}
