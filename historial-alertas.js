function toggleFiltro() {
  const box = document.getElementById("filtroBox");
  box.style.display = box.style.display === "grid" ? "none" : "grid";
}

function aplicarFiltros() {
  const key = document.getElementById("f-key").value.toLowerCase();
  const tipo = document.getElementById("f-tipo").value.toLowerCase();
  const antes = document.getElementById("f-antes").value;
  const despues = document.getElementById("f-despues").value;
  const exacta = document.getElementById("f-exacta").value;

  document.querySelectorAll(".notificacion").forEach((card) => {
    let mostrar = true;

    const fecha = card.getAttribute("data-fecha");
    const tipoCard = card.getAttribute("data-tipo").toLowerCase();
    const texto = card.innerText.toLowerCase();

    if (key && !texto.includes(key)) mostrar = false;
    if (tipo && !tipoCard.includes(tipo)) mostrar = false;
    if (exacta && fecha !== exacta) mostrar = false;
    if (antes && !(fecha < antes)) mostrar = false;
    if (despues && !(fecha > despues)) mostrar = false;

    card.style.display = mostrar ? "block" : "none";
  });
}

function limpiarFiltros() {
  document.getElementById("f-key").value = "";
  document.getElementById("f-tipo").value = "";
  document.getElementById("f-antes").value = "";
  document.getElementById("f-despues").value = "";
  document.getElementById("f-exacta").value = "";

  document.querySelectorAll(".notificacion").forEach((card) => {
    card.style.display = "block";
  });
}