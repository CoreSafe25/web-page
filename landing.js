document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     CARRUSEL DE GRÁFICOS (IMPACTO SOCIAL)
     ===================================================== */

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlideFunc() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  prevBtn.addEventListener("click", prevSlideFunc);
  nextBtn.addEventListener("click", nextSlide);



  /* =====================================================
     FORMULARIO DE CONTACTO
     ===================================================== */

  const contactForm = document.querySelector(".contacto form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[placeholder="Nombre"]').value.trim();
    const email = contactForm.querySelector('input[placeholder="Correo"]').value.trim();
    const company = contactForm.querySelector('input[placeholder="Empresa"]').value.trim();
    const phone = contactForm.querySelector('input[placeholder="Teléfono"]').value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    // Validaciones básicas
    if (name.length < 2) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Ingresa un correo válido.");
      return;
    }

    if (phone.length < 6) {
      alert("Ingresa un número telefónico válido.");
      return;
    }

    if (message.length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    // Éxito
    alert("✔ Gracias por contactarnos. Te responderemos pronto.");

    // Limpiar campos
    contactForm.reset();
  });

});
