
const reportCards = document.querySelectorAll(".report-card");

// Elementos del panel detalle
const detailTitle = document.getElementById("detailTitle");
const detailDate = document.getElementById("detailDate");
const detailUrgency = document.getElementById("detailUrgency");
const detailLocation = document.getElementById("detailLocation");
const detailDescription = document.getElementById("detailDescription");
const detailComments = document.getElementById("detailComments");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

// Cuando el usuario da click a un reporte
reportCards.forEach(card => {
  card.addEventListener("click", () => {

    // Obtener los atributos data-* del reporte
    const title = card.dataset.title;
    const date = card.dataset.date;
    const urgency = card.dataset.urgency;
    const location = card.dataset.location;
    const description = card.dataset.description;
    const comments = card.dataset.comments;
    const image1 = card.dataset.img1;
    const image2 = card.dataset.img2;

    // Actualizar el panel detalle
    detailTitle.textContent = title;
    detailDate.textContent = date;
    detailUrgency.textContent = urgency;
    detailUrgency.className = "urgency urgency-" + urgency.toLowerCase();
    detailLocation.textContent = location;
    detailDescription.textContent = description;
    detailComments.textContent = comments;

    img1.src = image1;
    img2.src = image2;
  });
});
