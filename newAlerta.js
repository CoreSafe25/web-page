// Ir desde emergencia.html → nueva-alerta.html
const goToAlert = document.getElementById("goToAlert");
if (goToAlert) {
  goToAlert.addEventListener("click", () => {
    window.location.href = "nueva-alerta.html";
  });
}

// Contadores de texto
function setupCounter(idTextarea, idCounter, max) {
  const textarea = document.getElementById(idTextarea);
  const counter = document.getElementById(idCounter);

  if (textarea) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length}/${max}`;
    });
  }
}

setupCounter("msg", "count250", 250);
setupCounter("zona", "count100", 100);
