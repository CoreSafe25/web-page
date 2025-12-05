document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Nombre completo"]').value.trim();
    const email = form.querySelector('input[placeholder="Correo electrónico"]').value.trim();
    const password = form.querySelector('input[placeholder="Contraseña"]').value.trim();

    // Validaciones simples
    if (name.length < 2) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    alert("✔ Registro exitoso. Ahora inicia sesión.");
    
    // Redirigir al login
    window.location.href = "index.html";
  });

});
