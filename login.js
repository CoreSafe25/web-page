document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    if (email === "" || password === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Ingresa un correo válido.");
      return;
    }

    // Simulación de login
    if (email === "admin@coresafe.com" && password === "123456") {
      alert("✔ Bienvenido a CoreSafe.");
      window.location.href = "landing.html";
    } else {
      alert("❌ Credenciales incorrectas.");
    }
  });

});
