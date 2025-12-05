document.addEventListener('DOMContentLoaded', () => {
  
  // ================================================================
  // VARIABLES GLOBALES
  // ================================================================
  let currentReplyTo = null; // Para trackear a quién estamos respondiendo
  let currentReplyCommentId = null; // ID del comentario que estamos respondiendo
  
  // Variables para filtros
  let activeFilters = {
    searchText: '',
    statuses: ['Activo', 'En revisión', 'Resuelto'],
    urgencies: ['ALTA', 'MEDIA', 'BAJA'],
    location: '',
    dateFrom: '',
    dateTo: ''
  };
  
  // ================================================================
  // INFINITE SCROLL - RESPONSIVE (MOBILE ONLY)
  // ================================================================
  const isMobile = () => window.innerWidth <= 768;
  let isLoadingMore = false;
  let infiniteCurrentPage = 0;
  const reportsPerPage = 3;
  
  // Datos actualizados con URLs de imágenes reales de Unsplash
  const allReportsData = [
    { 
      id: 'r1', 
      title: 'Grietas en construcción', 
      date: '2025-10-10', 
      urgency: 'ALTA', 
      location: 'San Miguel, Lima', 
      description: 'Grieta estructural en unión de techo y pared. Riesgo de desprendimiento.', 
      img1: 'https://images.unsplash.com/photo-1600585154340-963ed7476f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Se observa un daño serio que debe ser atendido de inmediato.', 
      comments_count: 12, 
      likes: 98 
    },
    { 
      id: 'r2', 
      title: 'Techo goteando', 
      date: '2025-10-11', 
      urgency: 'MEDIA', 
      location: 'Miraflores', 
      description: 'Filtro de agua en el techo del pasillo principal.', 
      img1: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1584118624012-df056829f8c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Esto puede empeorar si no se revisa.', 
      comments_count: 4, 
      likes: 27 
    },
    { 
      id: 'r3', 
      title: 'Pared húmeda', 
      date: '2025-10-12', 
      urgency: 'MEDIA', 
      location: 'La Molina', 
      description: 'Humedad en la pared cercana a tuberías internas.', 
      img1: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', 
      comments: 'La humedad está expandiéndose lentamente.', 
      comments_count: 7, 
      likes: 31 
    },
    { 
      id: 'r4', 
      title: 'Puerta dañada', 
      date: '2025-10-13', 
      urgency: 'BAJA', 
      location: 'Pueblo Libre', 
      description: 'Puerta de entrada con bisagras rotas.', 
      img1: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Necesita reparación pero no es urgente.', 
      comments_count: 5, 
      likes: 19 
    },
    { 
      id: 'r5', 
      title: 'Tuberías con fugas', 
      date: '2025-10-14', 
      urgency: 'ALTA', 
      location: 'San Borja', 
      description: 'Fuga de agua en tuberías del sótano.', 
      img1: 'https://images.unsplash.com/photo-1621967299229-c6e7085b9b6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1567721913496-6585be2e0e6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Riesgo de inundación, requiere atención inmediata.', 
      comments_count: 14, 
      likes: 56 
    },
    { 
      id: 'r6', 
      title: 'Escaleras resbaladizas', 
      date: '2025-10-15', 
      urgency: 'MEDIA', 
      location: 'Lince', 
      description: 'Escaleras principales con material antideslizante desgastado.', 
      img1: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1560355806-b9a5f8e42c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Peligro de accidentes por resbalones.', 
      comments_count: 9, 
      likes: 44 
    },
    { 
      id: 'r7', 
      title: 'Iluminación deficiente', 
      date: '2025-10-16', 
      urgency: 'MEDIA', 
      location: 'Jesús María', 
      description: 'Luminarias apagadas en el pasillo norte.', 
      img1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Necesita reemplazo de focos y revisión del circuito.', 
      comments_count: 6, 
      likes: 22 
    },
    { 
      id: 'r8', 
      title: 'Oxidación en columnas', 
      date: '2025-10-17', 
      urgency: 'ALTA', 
      location: 'Chaclacayo', 
      description: 'Columnas estructurales con oxidación avanzada.', 
      img1: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      img2: 'https://images.unsplash.com/photo-1594771253257-5daf8dcd9089?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
      comments: 'Riesgo estructural, requiere intervención profesional.', 
      comments_count: 11, 
      likes: 67 
    }
  ];

  // Datos de comentarios simulados por reporte
  const dummyComments = {
    r1: [
      { id: 'c1', user: 'Inspector Díaz', date: '2025-10-15', text: 'Se observa un daño serio que debe ser atendido de inmediato.', likes: 3, replies: [
        { id: 'r1c1', user: 'Supervisor López', date: '2025-10-16', text: 'Acuerdo, derivado a equipo técnico.', likes: 1, replies: [] }
      ]},
      { id: 'c2', user: 'Técnico Martínez', date: '2025-10-16', text: 'La grieta se está expandiendo. Se requiere intervención urgente.', likes: 5, replies: []}
    ],
    r2: [
      { id: 'c1', user: 'Ciudadano Gómez', date: '2025-10-12', text: 'El goteo ha aumentado en los últimos 3 días.', likes: 2, replies: [
        { id: 'r1c1', user: 'Técnico Rodríguez', date: '2025-10-13', text: 'Se programó revisión para el viernes.', likes: 0, replies: [] }
      ]},
      { id: 'c2', user: 'Inspector Pérez', date: '2025-10-14', text: 'Problema de sellado en tejas. Presupuesto disponible.', likes: 4, replies: []}
    ],
    r3: [
      { id: 'c1', user: 'Residente García', date: '2025-10-13', text: 'La humedad está expandiéndose lentamente.', likes: 1, replies: []},
      { id: 'c2', user: 'Técnico Silva', date: '2025-10-14', text: 'Se debe reparar el sistema de drenaje.', likes: 3, replies: []}
    ],
    r4: [
      { id: 'c1', user: 'Conserje Torres', date: '2025-10-14', text: 'Necesita reparación pero no es urgente.', likes: 0, replies: []}
    ],
    r5: [
      { id: 'c1', user: 'Inspector Ramírez', date: '2025-10-15', text: 'Riesgo de inundación, requiere atención inmediata.', likes: 4, replies: [
        { id: 'r1c1', user: 'Coordinador Flores', date: '2025-10-15', text: 'En proceso de reparación.', likes: 2, replies: [] }
      ]},
      { id: 'c2', user: 'Plomero Gutiérrez', date: '2025-10-16', text: 'Se reemplazarán las tuberías del sótano completo.', likes: 6, replies: []}
    ],
    r6: [
      { id: 'c1', user: 'Vigilante Mendez', date: '2025-10-16', text: 'Peligro de accidentes por resbalones.', likes: 2, replies: []},
      { id: 'c2', user: 'Supervisor Ríos', date: '2025-10-16', text: 'Ya adquirimos material antideslizante. Instalación programada.', likes: 3, replies: []}
    ],
    r7: [
      { id: 'c1', user: 'Técnico Eléctrico Castro', date: '2025-10-17', text: 'Necesita reemplazo de focos y revisión del circuito.', likes: 1, replies: []},
      { id: 'c2', user: 'Residente López', date: '2025-10-17', text: 'El área está muy oscura por las noches.', likes: 4, replies: []}
    ],
    r8: [
      { id: 'c1', user: 'Inspector Estructura Ruiz', date: '2025-10-18', text: 'Riesgo estructural, requiere intervención profesional.', likes: 5, replies: [
        { id: 'r1c1', user: 'Ingeniero Valdez', date: '2025-10-18', text: 'Presupuesto aprobado. Contratistas están en camino.', likes: 3, replies: [] }
      ]},
      { id: 'c2', user: 'Supervisor Hernández', date: '2025-10-18', text: 'Prioridad máxima. Seguimiento diario.', likes: 2, replies: []}
    ]
  };

  // ================================================================
  // ELEMENTOS DOM
  // ================================================================
  const cards = document.querySelectorAll('.report-card');
  const detail = {
    title: document.getElementById('detailTitle'),
    urgency: document.getElementById('detailUrgency'),
    date: document.getElementById('detailDate'),
    location: document.getElementById('detailLocation'),
    inspector: document.getElementById('detailInspector'),
    validation: document.getElementById('detailValidation'),
    description: document.getElementById('detailDescription'),
    img1: document.getElementById('img1'),
    img2: document.getElementById('img2'),
    comments: document.getElementById('detailComments'),
    likes: document.getElementById('detailLikes')
  };
  const btnApply = document.getElementById('btnApply');
  const appliedModal = document.getElementById('appliedModal');
  let currentCard = null;
  const detailState = document.getElementById('detailState');
  const btnChangeState = document.getElementById('btnChangeState');
  const resolveModal = document.getElementById('resolveModal');
  const resolveNote = document.getElementById('resolveNote');
  const btnConfirmResolve = document.getElementById('btnConfirmResolve');
  const btnCancelResolve = document.getElementById('btnCancelResolve');
  
  // Elementos para respuestas a comentarios
  const cancelReplyBtn = document.getElementById('cancelReply');
  const submitReplyBtn = document.getElementById('submitReply');
  const replyText = document.getElementById('replyText');
  const replyToUser = document.getElementById('replyToUser');
  const replySection = document.getElementById('replySection');

  // Elementos para filtrado
  const searchInput = document.getElementById('searchInput');
  const filterBtn = document.getElementById('filterBtn');
  const filterModal = document.getElementById('filterModal');
  const closeFilterModal = document.getElementById('closeFilterModal');
  const applyFiltersBtn = document.getElementById('applyFilters');
  const resetFiltersBtn = document.getElementById('resetFilters');
  const filterStatusCheckboxes = document.querySelectorAll('.filter-status');
  const filterUrgencyCheckboxes = document.querySelectorAll('.filter-urgency');
  const filterLocationSelect = document.getElementById('filterLocation');
  const filterDateFrom = document.getElementById('filterDateFrom');
  const filterDateTo = document.getElementById('filterDateTo');

  // Elementos para menú hamburguesa
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Elementos para selector de riesgo
  const riskDetailOptions = document.querySelectorAll('.risk-detail-option');

  // ================================================================
  // FUNCIONES DE MENÚ HAMBURGUESA
  // ================================================================
  function toggleMobileMenu() {
    if (isMobile()) {
      navMenu.classList.toggle('active');
      // Crear o eliminar overlay
      let overlay = document.querySelector('.menu-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
          navMenu.classList.remove('active');
          overlay.classList.remove('active');
        });
      }
      overlay.classList.toggle('active');
    }
  }

  // ================================================================
  // FUNCIONES DE SELECTOR DE RIESGO
  // ================================================================
  function initializeRiskSelectors() {
    // Inicializar selectores de riesgo en tarjetas
    const riskSelectors = document.querySelectorAll('.risk-option');
    riskSelectors.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.report-card');
        const reportId = card.dataset.id;
        const newRisk = this.dataset.risk;
        
        // Actualizar el dataset de la tarjeta
        card.dataset.urgency = newRisk;
        
        // Actualizar la clase de urgencia en el detalle si esta tarjeta está seleccionada
        if (currentCard && currentCard === card) {
          updateDetailRisk(newRisk);
        }
        
        // Actualizar la interfaz de usuario
        updateRiskSelectorUI(this);
        
        // Guardar en localStorage
        saveRiskPreference(reportId, newRisk);
      });
    });
    
    // Inicializar selectores de riesgo en el detalle
    if (riskDetailOptions) {
      riskDetailOptions.forEach(option => {
        option.addEventListener('click', function() {
          if (!currentCard) return;
          
          const newRisk = this.dataset.risk;
          const reportId = currentCard.dataset.id;
          
          // Actualizar el dataset de la tarjeta
          currentCard.dataset.urgency = newRisk;
          
          // Actualizar la interfaz de usuario
          updateDetailRisk(newRisk);
          
          // Actualizar el selector de riesgo en la tarjeta
          updateCardRiskSelector(currentCard, newRisk);
          
          // Guardar en localStorage
          saveRiskPreference(reportId, newRisk);
        });
      });
    }
  }
  
  function updateRiskSelectorUI(selectedOption) {
    const selectorContainer = selectedOption.closest('.risk-options');
    const options = selectorContainer.querySelectorAll('.risk-option');
    
    // Remover clase selected de todas las opciones
    options.forEach(option => {
      option.classList.remove('selected');
    });
    
    // Agregar clase selected a la opción clickeada
    selectedOption.classList.add('selected');
  }
  
  function updateDetailRisk(riskLevel) {
    // Actualizar la visualización de riesgo en el detalle
    const urgencySpan = document.getElementById('detailUrgency');
    if (urgencySpan) {
      urgencySpan.textContent = riskLevel;
      urgencySpan.className = 'urgency';
      
      if (riskLevel === 'ALTA') urgencySpan.classList.add('urgency-high');
      else if (riskLevel === 'MEDIA') urgencySpan.classList.add('urgency-medium');
      else urgencySpan.classList.add('urgency-low');
    }
    
    // Actualizar el selector de riesgo en el detalle
    if (riskDetailOptions) {
      riskDetailOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.risk === riskLevel) {
          option.classList.add('selected');
        }
      });
    }
  }
  
  function updateCardRiskSelector(card, riskLevel) {
    const riskOptions = card.querySelectorAll('.risk-option');
    riskOptions.forEach(option => {
      option.classList.remove('selected');
      if (option.dataset.risk === riskLevel) {
        option.classList.add('selected');
      }
    });
  }
  
  function saveRiskPreference(reportId, riskLevel) {
    try {
      localStorage.setItem(`risk:${reportId}`, riskLevel);
    } catch (e) {
      console.error('Error al guardar preferencia de riesgo:', e);
    }
  }
  
  function loadRiskPreference(reportId) {
    try {
      return localStorage.getItem(`risk:${reportId}`);
    } catch (e) {
      console.error('Error al cargar preferencia de riesgo:', e);
      return null;
    }
  }

  // ================================================================
  // FUNCIONES DE FILTRADO
  // ================================================================
  function applyFilters() {
    const reportCards = document.querySelectorAll('.report-card');
    let visibleCount = 0;
    
    reportCards.forEach(card => {
      const matches = cardMatchesFilters(card);
      
      if (matches) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Mostrar mensaje si no hay resultados
    const reportList = document.querySelector('.report-list');
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 40px; color: #777;">
            <div style="font-size: 3rem; margin-bottom: 15px;">🔍</div>
            <h3>No se encontraron reportes</h3>
            <p>Intenta con otros filtros o términos de búsqueda.</p>
            <button id="clearAllFilters" class="btn" style="margin-top: 15px;">Limpiar todos los filtros</button>
          </div>
        `;
        reportList.appendChild(noResultsMsg);
        
        // Agregar listener al botón de limpiar filtros
        const clearAllFiltersBtn = document.getElementById('clearAllFilters');
        if (clearAllFiltersBtn) {
          clearAllFiltersBtn.addEventListener('click', resetAllFilters);
        }
      }
    } else {
      if (noResultsMsg) {
        noResultsMsg.remove();
      }
    }
  }

  function cardMatchesFilters(card) {
    // 1. Filtro por texto de búsqueda
    if (activeFilters.searchText) {
      const searchText = activeFilters.searchText.toLowerCase();
      const title = (card.dataset.title || '').toLowerCase();
      const location = (card.dataset.location || '').toLowerCase();
      const description = (card.dataset.description || '').toLowerCase();
      
      if (!title.includes(searchText) && 
          !location.includes(searchText) && 
          !description.includes(searchText)) {
        return false;
      }
    }
    
    // 2. Filtro por estado (desde localStorage)
    const key = getReportKey(card);
    const storedStatus = localStorage.getItem(`status:${key}`) || 'Activo';
    
    if (!activeFilters.statuses.includes(storedStatus)) {
      return false;
    }
    
    // 3. Filtro por urgencia
    const urgency = card.dataset.urgency || '';
    if (!activeFilters.urgencies.includes(urgency)) {
      return false;
    }
    
    // 4. Filtro por ubicación
    if (activeFilters.location) {
      const location = card.dataset.location || '';
      if (!location.includes(activeFilters.location)) {
        return false;
      }
    }
    
    // 5. Filtro por fecha
    if (activeFilters.dateFrom || activeFilters.dateTo) {
      const cardDate = new Date(card.dataset.date || '');
      
      if (activeFilters.dateFrom) {
        const fromDate = new Date(activeFilters.dateFrom);
        if (cardDate < fromDate) return false;
      }
      
      if (activeFilters.dateTo) {
        const toDate = new Date(activeFilters.dateTo);
        toDate.setHours(23, 59, 59, 999); // Incluir todo el día
        if (cardDate > toDate) return false;
      }
    }
    
    return true;
  }

  function updateFilterUI() {
    // Actualizar checkboxes de estado
    filterStatusCheckboxes.forEach(checkbox => {
      checkbox.checked = activeFilters.statuses.includes(checkbox.value);
    });
    
    // Actualizar checkboxes de urgencia
    filterUrgencyCheckboxes.forEach(checkbox => {
      checkbox.checked = activeFilters.urgencies.includes(checkbox.value);
    });
    
    // Actualizar select de ubicación
    if (filterLocationSelect) {
      filterLocationSelect.value = activeFilters.location || '';
    }
    
    // Actualizar fechas
    if (filterDateFrom) {
      filterDateFrom.value = activeFilters.dateFrom || '';
    }
    
    if (filterDateTo) {
      filterDateTo.value = activeFilters.dateTo || '';
    }
  }

  function resetAllFilters() {
    activeFilters = {
      searchText: '',
      statuses: ['Activo', 'En revisión', 'Resuelto'],
      urgencies: ['ALTA', 'MEDIA', 'BAJA'],
      location: '',
      dateFrom: '',
      dateTo: ''
    };
    
    // Actualizar UI
    if (searchInput) searchInput.value = '';
    updateFilterUI();
    
    // Aplicar filtros (que mostrará todas las tarjetas)
    applyFilters();
    
    // Cerrar modal si está abierto
    if (filterModal) {
      filterModal.classList.remove('visible');
      filterModal.setAttribute('aria-hidden', 'true');
    }
  }

  // ================================================================
  // FUNCIONES DE INFINITE SCROLL
  // ================================================================
  function createReportCard(report) {
    // Cargar preferencia de riesgo guardada
    const savedRisk = loadRiskPreference(report.id) || report.urgency;
    const isHighSelected = savedRisk === 'ALTA' ? 'selected' : '';
    const isMediumSelected = savedRisk === 'MEDIA' ? 'selected' : '';
    const isLowSelected = savedRisk === 'BAJA' ? 'selected' : '';
    
    const card = document.createElement('div');
    card.className = 'report-card';
    card.dataset.id = report.id;
    card.dataset.title = report.title;
    card.dataset.date = report.date;
    card.dataset.urgency = savedRisk; // Usar riesgo guardado
    card.dataset.location = report.location;
    card.dataset.description = report.description;
    card.dataset.img1 = report.img1;
    card.dataset.img2 = report.img2;
    card.dataset.comments = report.comments;
    card.innerHTML = `
      <h3>${report.title}</h3>
      <div class="meta">
        <span class="date">📅 ${report.date}</span>
        <div class="risk-selector">
          <span class="risk-label">Riesgo:</span>
          <div class="risk-options">
            <span class="risk-option risk-high ${isHighSelected}" data-risk="ALTA">ALTO</span>
            <span class="risk-option risk-medium ${isMediumSelected}" data-risk="MEDIA">MEDIO</span>
            <span class="risk-option risk-low ${isLowSelected}" data-risk="BAJA">BAJO</span>
          </div>
        </div>
        <span class="card-status status-active">Activo</span>
      </div>
      <div class="icons">
        <span class="comment-icon">🗨️ <span class="comment-count">${report.comments_count}</span></span>
        <span class="like-container">
          <span class="like-button" data-report-id="${report.id}">🤍</span> <span class="like-count">${report.likes}</span>
        </span>
      </div>
    `;
    return card;
  }

  function setupCardListeners(card) {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => populate(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        populate(card);
      }
    });
    
    // Agregar listeners a los selectores de riesgo
    const riskOptions = card.querySelectorAll('.risk-option');
    riskOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        const reportId = card.dataset.id;
        const newRisk = this.dataset.risk;
        
        // Actualizar el dataset de la tarjeta
        card.dataset.urgency = newRisk;
        
        // Actualizar la clase de urgencia en el detalle si esta tarjeta está seleccionada
        if (currentCard && currentCard === card) {
          updateDetailRisk(newRisk);
        }
        
        // Actualizar la interfaz de usuario
        updateRiskSelectorUI(this);
        
        // Guardar en localStorage
        saveRiskPreference(reportId, newRisk);
      });
    });
  }

  function loadMoreReports() {
    if (!isMobile() || isLoadingMore) return;
    isLoadingMore = true;
    const reportList = document.querySelector('.report-list');
    const start = infiniteCurrentPage * reportsPerPage;
    const end = start + reportsPerPage;
    const reportsToAdd = allReportsData.slice(start, end);
    reportsToAdd.forEach(report => {
      const card = createReportCard(report);
      reportList.appendChild(card);
      setupCardListeners(card);
      // Agregar listeners de like a las nuevas tarjetas
      const likeButton = card.querySelector('.like-button');
      if (likeButton) {
        likeButton.addEventListener('click', (e) => handleCardLike(e, card));
        // Restaurar estado de liked si existe
        const key = getReportKey(card);
        const likedReports = JSON.parse(localStorage.getItem('likedReports') || '{}');
        if (likedReports[key]) {
          likeButton.textContent = '❤️';
          likeButton.classList.add('liked');
        }
      }
    });
    infiniteCurrentPage++;
    isLoadingMore = false;
    
    // Aplicar filtros a las nuevas tarjetas
    applyFilters();
  }

  function setupInfiniteScroll() {
    if (!isMobile()) return;
    const listSection = document.querySelector('.list-section');
    if (!listSection) return;
    listSection.addEventListener('scroll', () => {
      if (listSection.scrollTop + listSection.clientHeight >= listSection.scrollHeight - 100) {
        loadMoreReports();
      }
    });
  }

  // ================================================================
  // FUNCIONES DE COMENTARIOS Y RESPUESTAS
  // ================================================================
  function getReportKey(card) {
    return card.dataset.id || card.dataset.title || card.id || '';
  }

  function extractNumberFromText(text) {
    const m = String(text).match(/(\d+)/);
    return m ? m[1] : '0';
  }

  // Función para agregar un nuevo comentario/reply
  function addNewComment(reportKey, parentCommentId, user, text, isReply = false) {
    // Obtener comentarios actuales
    const currentComments = dummyComments[reportKey] || [];
    
    // Crear nuevo comentario
    const newComment = {
      id: `c${Date.now()}`, // ID único
      user: user,
      date: new Date().toISOString().split('T')[0], // Fecha actual
      text: text,
      likes: 0,
      replies: []
    };
    
    if (isReply && parentCommentId) {
      // Buscar el comentario padre y agregar el reply
      const parentComment = findCommentById(currentComments, parentCommentId);
      if (parentComment) {
        parentComment.replies.push(newComment);
      }
    } else {
      // Agregar como comentario principal
      currentComments.push(newComment);
      dummyComments[reportKey] = currentComments;
    }
    
    // Actualizar la lista de comentarios
    populateComments(reportKey);
  }

  // Función auxiliar para encontrar un comentario por ID
  function findCommentById(comments, commentId) {
    for (const comment of comments) {
      if (comment.id === commentId) return comment;
      if (comment.replies && comment.replies.length > 0) {
        const found = findCommentById(comment.replies, commentId);
        if (found) return found;
      }
    }
    return null;
  }

  // Función para mostrar la sección de respuesta
  function showReplySection(userName) {
    if (replySection && replyToUser) {
      replyToUser.textContent = `Respondiendo a: ${userName}`;
      replySection.style.display = 'block';
      if (replyText) replyText.focus();
      
      // Desplazar la vista hacia el área de respuesta
      replySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Función para ocultar la sección de respuesta
  function hideReplySection() {
    if (replySection) {
      replySection.style.display = 'none';
      if (replyText) replyText.value = '';
      currentReplyTo = null;
      currentReplyCommentId = null;
    }
  }

  // Renderizar comentarios dinámicamente
  function createCommentElement(comment, reportKey, isReply = false) {
    const div = document.createElement('div');
    div.className = `comment-entry ${isReply ? 'reply' : ''}`;
    div.dataset.commentId = comment.id;
    
    const likedComments = JSON.parse(localStorage.getItem('likedComments') || '{}');
    const commentKey = `${reportKey}_${comment.id}`;
    const isLiked = !!likedComments[commentKey];

    div.innerHTML = `
      <div class="comment-header">
        <span class="comment-user-name">${comment.user}</span>
        <span class="comment-date">${comment.date}</span>
      </div>
      <div class="comment-text">${comment.text}</div>
      <div class="comment-actions">
        <button class="comment-like-btn ${isLiked ? 'liked' : ''}" data-comment-id="${comment.id}" data-report-key="${reportKey}">
          ❤️ ${comment.likes}
        </button>
        ${!isReply ? '<button class="comment-reply-btn" data-comment-id="' + comment.id + '">Responder</button>' : ''}
      </div>
    `;

    // Manejar likes de comentarios
    const likeBtn = div.querySelector('.comment-like-btn');
    if (likeBtn) {
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCommentLike(e, comment, reportKey, likeBtn);
      });
    }

    // Manejar botón de responder
    const replyBtn = div.querySelector('.comment-reply-btn');
    if (replyBtn) {
      replyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentReplyTo = comment.user;
        currentReplyCommentId = comment.id;
        showReplySection(comment.user);
      });
    }

    // Agregar replies (si existen)
    if (comment.replies && comment.replies.length > 0) {
      const repliesContainer = document.createElement('div');
      repliesContainer.style.marginTop = '8px';
      comment.replies.forEach(reply => {
        repliesContainer.appendChild(createCommentElement(reply, reportKey, true));
      });
      div.appendChild(repliesContainer);
    }

    return div;
  }

  function handleCommentLike(e, comment, reportKey, likeBtn) {
    e.stopPropagation();
    const commentKey = `${reportKey}_${comment.id}`;
    const likedComments = JSON.parse(localStorage.getItem('likedComments') || '{}');
    
    if (likedComments[commentKey]) {
      delete likedComments[commentKey];
      likeBtn.classList.remove('liked');
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      likedComments[commentKey] = true;
      likeBtn.classList.add('liked');
      comment.likes++;
    }
    likeBtn.textContent = `❤️ ${comment.likes}`;
    try { localStorage.setItem('likedComments', JSON.stringify(likedComments)); } catch (e) {}
  }

  function populateComments(reportKey) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    commentsList.innerHTML = '';
    
    // Obtener comentarios del reporte o usar comentarios vacíos
    const comments = dummyComments[reportKey] || [];
    
    comments.forEach(comment => {
      commentsList.appendChild(createCommentElement(comment, reportKey, false));
    });

    // Si no hay comentarios, mostrar mensaje
    if (comments.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = 'No hay comentarios aún. Sé el primero en comentar.';
      emptyMsg.style.color = '#888';
      emptyMsg.style.fontStyle = 'italic';
      commentsList.appendChild(emptyMsg);
    }
  }

  // ================================================================
  // FUNCIONES PRINCIPALES
  // ================================================================
  function clearSelected() {
    cards.forEach(c => c.classList.remove('selected'));
  }

  function populate(card) {
    clearSelected();
    card.classList.add('selected');
    currentCard = card;

    detail.title.textContent = card.dataset.title || '—';

    // Urgencia y clases - usar riesgo guardado o dataset
    const savedRisk = loadRiskPreference(card.dataset.id) || card.dataset.urgency || 'MEDIA';
    updateDetailRisk(savedRisk);

    detail.date.textContent = card.dataset.date || '—';
    detail.location.textContent = card.dataset.location || '—';
    detail.description.textContent = card.dataset.description || '—';
    
    // Mostrar imágenes reales desde los datos
    detail.img1.src = card.dataset.img1 || 'https://via.placeholder.com/150';
    detail.img2.src = card.dataset.img2 || 'https://via.placeholder.com/150';
    
    detail.comments.textContent = card.dataset.comments || '—';

    // Extraer likes desde el bloque .icons
    const icons = card.querySelectorAll('.icons span');
    let likes = '0';
    icons.forEach(span => {
      if (span.textContent.includes('❤️') || span.textContent.includes('❤')) {
        likes = extractNumberFromText(span.textContent);
      }
    });
    detail.likes.textContent = likes;

    // 1. Leer el estado de Aplicado y Status desde localStorage
    const key = getReportKey(card);
    const applied = localStorage.getItem(`applied:${key}`) === 'true';
    const statusKey = `status:${key}`;
    const storedStatus = localStorage.getItem(statusKey) || 'Activo'; 

    // 2. Actualizar el Status del detalle
    const statusEl = document.querySelector('.detail-header .status');
    if (statusEl) {
      statusEl.className = 'status';
      if (storedStatus === 'Activo') statusEl.classList.add('status-active');
      else if (storedStatus === 'En revisión') statusEl.classList.add('status-review');
      else if (storedStatus === 'Resuelto') statusEl.classList.add('status-resolved');
      statusEl.textContent = storedStatus;
    }

    if (detailState) {
      detailState.value = storedStatus;
    }

    // 3. Actualizar la tarjeta y el botón "Aplicar"
    if (btnApply) {
      if (applied) {
        // Estado Aplicado: actualizar botón y tarjeta
        btnApply.textContent = 'Aplicado';
        btnApply.disabled = true;
        btnApply.classList.add('applied');
        currentCard.classList.add('applied'); 
      } else {
        // Estado NO Aplicado: restablecer botón y tarjeta
        btnApply.textContent = 'Aplicar / Contactar';
        btnApply.disabled = false;
        btnApply.classList.remove('applied');
        currentCard.classList.remove('applied'); 
      }
    }

    // 4. MOSTRAR DETALLE EN MÓVIL
    const detailView = document.getElementById('detailView');
    if (isMobile() && detailView) {
      detailView.classList.add('visible');
    }

    // 5. Manejar likes del reporte en el detalle
    const likeButtonDetail = document.getElementById('likeButtonDetail');
    if (likeButtonDetail && key) {
      const likedReports = JSON.parse(localStorage.getItem('likedReports') || '{}');
      if (likedReports[key]) {
        likeButtonDetail.textContent = '❤️';
        likeButtonDetail.classList.add('liked');
      } else {
        likeButtonDetail.textContent = '🤍';
        likeButtonDetail.classList.remove('liked');
      }
      
      likeButtonDetail.removeEventListener('click', handleReportLike);
      likeButtonDetail.addEventListener('click', (e) => handleReportLike(e, card));
    }

    // 6. Cargar comentarios dinámicamente
    populateComments(key);
  }

  // Manejo de likes de reportes
  function handleReportLike(e, card) {
    e.stopPropagation();
    const key = getReportKey(card);
    const likedReports = JSON.parse(localStorage.getItem('likedReports') || '{}');
    const likeButtonDetail = document.getElementById('likeButtonDetail');
    const detailLikesSpan = document.getElementById('detailLikes');
    const cardLikeCount = card.querySelector('.like-count');

    if (likedReports[key]) {
      // Ya está liked, remover like
      delete likedReports[key];
      likeButtonDetail.textContent = '🤍';
      likeButtonDetail.classList.remove('liked');
      const currentLikes = parseInt(detailLikesSpan.textContent) || 0;
      detailLikesSpan.textContent = Math.max(0, currentLikes - 1);
      if (cardLikeCount) cardLikeCount.textContent = Math.max(0, currentLikes - 1);
    } else {
      // No está liked, agregar like
      likedReports[key] = true;
      likeButtonDetail.textContent = '❤️';
      likeButtonDetail.classList.add('liked');
      const currentLikes = parseInt(detailLikesSpan.textContent) || 0;
      detailLikesSpan.textContent = currentLikes + 1;
      if (cardLikeCount) cardLikeCount.textContent = currentLikes + 1;
    }
    try { localStorage.setItem('likedReports', JSON.stringify(likedReports)); } catch (e) {}
  }

  // Manejo de likes en tarjetas de reportes
  function handleCardLike(e, card) {
    e.stopPropagation();
    const key = getReportKey(card);
    const likedReports = JSON.parse(localStorage.getItem('likedReports') || '{}');
    const likeButton = card.querySelector('.like-button');
    const likeCount = card.querySelector('.like-count');

    if (likedReports[key]) {
      delete likedReports[key];
      likeButton.textContent = '🤍';
      likeButton.classList.remove('liked');
      let count = parseInt(likeCount.textContent) || 0;
      likeCount.textContent = Math.max(0, count - 1);
    } else {
      likedReports[key] = true;
      likeButton.textContent = '❤️';
      likeButton.classList.add('liked');
      let count = parseInt(likeCount.textContent) || 0;
      likeCount.textContent = count + 1;
    }
    try { localStorage.setItem('likedReports', JSON.stringify(likedReports)); } catch (e) {}
  }

  // Inicializar likes en tarjetas existentes
  function initializeCardLikes() {
    const likedReports = JSON.parse(localStorage.getItem('likedReports') || '{}');
    cards.forEach(card => {
      const key = getReportKey(card);
      const likeButton = card.querySelector('.like-button');
      if (likeButton && likedReports[key]) {
        likeButton.textContent = '❤️';
        likeButton.classList.add('liked');
      }
      if (likeButton) {
        likeButton.addEventListener('click', (e) => handleCardLike(e, card));
      }
    });
  }

  // ================================================================
  // EVENT LISTENERS PARA TARJETAS
  // ================================================================
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => populate(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        populate(card);
      }
    });
  });

  // ================================================================
  // EVENT LISTENERS PARA BOTONES
  // ================================================================
  // Apply button behavior: mark as aplicado and show mini modal
  if (btnApply) {
    btnApply.addEventListener('click', () => {
      if (!currentCard) return;
      const key = getReportKey(currentCard);
      
      // Marcar como aplicado y persistir
      currentCard.dataset.applied = 'true';
      currentCard.classList.add('applied');
      try { localStorage.setItem(`applied:${key}`, 'true'); } catch (e) { /* ignore */ }

      // También establecer el estado a 'En revisión'
      const newState = 'En revisión';
      try { localStorage.setItem(`status:${key}`, newState); } catch (e) {}
      
      // Actualizar UI de estado
      const statusEl = document.querySelector('.detail-header .status');
      if (statusEl) {
        statusEl.className = 'status status-review';
        statusEl.textContent = newState;
      }
      if (detailState) detailState.value = newState;

      // Actualizar botón
      btnApply.textContent = 'Aplicado';
      btnApply.disabled = true;
      btnApply.classList.add('applied');
      
      // Mostrar modal
      if (appliedModal) {
        appliedModal.setAttribute('aria-hidden', 'false');
        appliedModal.classList.add('visible');
        setTimeout(() => {
          appliedModal.classList.remove('visible');
          appliedModal.setAttribute('aria-hidden', 'true');
        }, 1400);
      }
    });
  }

  // Handle state change button
  if (btnChangeState && detailState) {
    btnChangeState.addEventListener('click', () => {
      if (!currentCard) return;
      const newState = detailState.value;
      const key = getReportKey(currentCard);
      const statusKey = `status:${key}`;
      
      if (newState === 'Resuelto') {
        // Mostrar modal de resolución para la nota
        if (resolveModal) {
          resolveModal.setAttribute('aria-hidden', 'false');
          resolveModal.classList.add('visible');
        }
      } else {
        // Aplicar otros estados inmediatamente
        try { localStorage.setItem(statusKey, newState); } catch (e) {}
        
        // Actualizar UI
        const statusEl = document.querySelector('.detail-header .status');
        if (statusEl) {
          statusEl.className = 'status';
          if (newState === 'Activo') statusEl.classList.add('status-active');
          else if (newState === 'En revisión') statusEl.classList.add('status-review');
          else statusEl.classList.add('status-closed');
          statusEl.textContent = newState;
        }
      }
    });
  }

  // Resolve modal confirm
  if (btnConfirmResolve) {
    btnConfirmResolve.addEventListener('click', () => {
      if (!currentCard) return;
      const note = resolveNote ? resolveNote.value.trim() : '';
      const key = getReportKey(currentCard);
      const statusKey = `status:${key}`;
      const noteKey = `statusNote:${key}`;
      
      // Persistir estado y nota de resolución
      try { localStorage.setItem(statusKey, 'Resuelto'); } catch (e) {}
      try { localStorage.setItem(noteKey, note); } catch (e) {}
      // Eliminar el estado 'aplicado'
      localStorage.removeItem(`applied:${key}`);
      

      // Actualizar UI
      const statusEl = document.querySelector('.detail-header .status');
      if (statusEl) {
        statusEl.className = 'status status-resolved';
        statusEl.textContent = 'Resuelto';
      }
      if (detailState) detailState.value = 'Resuelto';
      
      // Actualizar la tarjeta y el botón de aplicar al resolver
      if (currentCard) {
        currentCard.classList.remove('applied');
        if (btnApply) {
          btnApply.textContent = 'Aplicar / Contactar';
          btnApply.disabled = false;
          btnApply.classList.remove('applied');
        }
      }

      // Cerrar modal
      if (resolveModal) {
        resolveModal.classList.remove('visible');
        resolveModal.setAttribute('aria-hidden', 'true');
      }
      if (resolveNote) resolveNote.value = '';
    });
  }

  // Resolve modal cancel
  if (btnCancelResolve) {
    btnCancelResolve.addEventListener('click', () => {
      if (resolveModal) {
        resolveModal.classList.remove('visible');
        resolveModal.setAttribute('aria-hidden', 'true');
      }
      // Restaurar el selector de estado al valor actual del reporte
      if (currentCard && detailState) {
        const key = getReportKey(currentCard);
        const storedStatus = localStorage.getItem(`status:${key}`) || 'Activo'; 
        detailState.value = storedStatus;
      }
    });
  }

  // Event listeners para respuestas a comentarios
  if (cancelReplyBtn) {
    cancelReplyBtn.addEventListener('click', hideReplySection);
  }
  
  if (submitReplyBtn && replyText) {
    submitReplyBtn.addEventListener('click', () => {
      const text = replyText.value.trim();
      if (!text) {
        alert('Por favor, escribe una respuesta');
        return;
      }
      
      if (!currentCard) {
        alert('No hay un reporte seleccionado');
        return;
      }
      
      const reportKey = getReportKey(currentCard);
      
      // Determinar el usuario actual (podrías cambiar esto según tu lógica de autenticación)
      const currentUser = 'Inspector Actual'; // Cambia esto según tu sistema
      
      // Agregar el nuevo comentario/reply
      addNewComment(reportKey, currentReplyCommentId, currentUser, text, true);
      
      // Ocultar la sección de respuesta y limpiar
      hideReplySection();
      
      // Mostrar confirmación
      alert('Respuesta enviada correctamente');
    });
    
    // Permitir enviar con Ctrl+Enter
    if (replyText) {
      replyText.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
          submitReplyBtn.click();
        }
      });
    }
  }

  // ================================================================
  // EVENT LISTENERS PARA MENÚ HAMBURGUESA
  // ================================================================
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Cerrar menú al hacer clic en un enlace
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && isMobile()) {
        toggleMobileMenu();
      }
    });
  }

  // ================================================================
  // EVENT LISTENERS PARA FILTROS
  // ================================================================
  // Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.searchText = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // Abrir modal de filtros
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      updateFilterUI();
      filterModal.setAttribute('aria-hidden', 'false');
      filterModal.classList.add('visible');
    });
  }

  // Cerrar modal de filtros
  if (closeFilterModal) {
    closeFilterModal.addEventListener('click', () => {
      filterModal.classList.remove('visible');
      filterModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Aplicar filtros desde el modal
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      // Obtener estados seleccionados
      const selectedStatuses = [];
      filterStatusCheckboxes.forEach(checkbox => {
        if (checkbox.checked) selectedStatuses.push(checkbox.value);
      });
      activeFilters.statuses = selectedStatuses;
      
      // Obtener urgencias seleccionadas
      const selectedUrgencies = [];
      filterUrgencyCheckboxes.forEach(checkbox => {
        if (checkbox.checked) selectedUrgencies.push(checkbox.value);
      });
      activeFilters.urgencies = selectedUrgencies;
      
      // Obtener ubicación seleccionada
      if (filterLocationSelect) {
        activeFilters.location = filterLocationSelect.value;
      }
      
      // Obtener fechas
      if (filterDateFrom) {
        activeFilters.dateFrom = filterDateFrom.value;
      }
      
      if (filterDateTo) {
        activeFilters.dateTo = filterDateTo.value;
      }
      
      // Aplicar filtros
      applyFilters();
      
      // Cerrar modal
      filterModal.classList.remove('visible');
      filterModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Restablecer filtros
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // Cerrar modal al hacer clic fuera
  if (filterModal) {
    filterModal.addEventListener('click', (e) => {
      if (e.target === filterModal) {
        filterModal.classList.remove('visible');
        filterModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ================================================================
  // MOBILE DETAIL VIEW MANAGEMENT
  // ================================================================
  const detailView = document.getElementById('detailView');
  const detailHeader = document.querySelector('.detail-header');

  // Función para cerrar el detalle en móvil
  function closeDetailView() {
    if (detailView) {
      detailView.classList.remove('visible');
    }
    clearSelected();
    hideReplySection(); // También ocultar la sección de respuesta si está abierta
  }

  // Click en el header (zona "Atrás") para cerrar
  if (detailHeader) {
    detailHeader.addEventListener('click', (e) => {
      if (isMobile()) {
        closeDetailView();
      }
    });
  }

  // Cerrar detalle si se redimensiona a desktop
  window.addEventListener('resize', () => {
    if (!isMobile() && detailView) {
      detailView.classList.remove('visible');
      clearSelected();
      hideReplySection();
    }
    
    // Cerrar menú hamburguesa si se redimensiona a desktop
    if (!isMobile() && navMenu) {
      navMenu.classList.remove('active');
      const overlay = document.querySelector('.menu-overlay');
      if (overlay) {
        overlay.classList.remove('active');
      }
    }
  });

  // ================================================================
  // INICIALIZACIÓN
  // ================================================================
  initializeCardLikes();
  initializeRiskSelectors();
  setupInfiniteScroll();
  
  // Aplicar filtros iniciales
  applyFilters();
});