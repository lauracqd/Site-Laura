const underline = document.querySelector('.menu-underline');
const links = document.querySelectorAll('.menu a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Positionne la barre SANS animation au chargement
links.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    underline.style.width = link.offsetWidth + 'px';
    underline.style.left = link.offsetLeft + 'px';
  }
});
// ---------- Contact form handling moved from presence.html ----------
document.addEventListener('DOMContentLoaded', function(){
  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  var consentBox = document.getElementById('consent');
  var consentError = document.getElementById('consent-error');
  if(!contactForm) return;
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    // Validation personnalisée du consentement
    if(consentBox && !consentBox.checked){
      if(consentError){
        consentError.style.display = 'block';
      }
      consentBox.focus();
      return;
    } else if(consentError){
      consentError.style.display = 'none';
    }

    // Validation HTML5 pour les autres champs
    if(!contactForm.checkValidity()){
      contactForm.reportValidity();
      return;
    }

    // Simuler l'envoi
    if(contactSuccess){
      contactSuccess.style.display = 'block';
    }
    contactForm.reset();
    if(consentError) consentError.style.display = 'none';
    if(contactSuccess) contactSuccess.scrollIntoView({behavior: 'smooth', block: 'center'});
  });
});



// Active la transition APRÈS le positionnement initial
setTimeout(() => {
  underline.style.transition = 'all 0.4s ease-in-out';
}, 100);

// Anime au clic
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    underline.style.width = this.offsetWidth + 'px';
    underline.style.left = this.offsetLeft + 'px';
    
    // Navigation après l'animation
    setTimeout(() => {
      window.location.href = this.getAttribute('href');
    }, 400);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const target = document.querySelector('.underline-animated');

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight * 2/3) && // 100px avant le bas de l'écran
      rect.bottom >= 0
    );
  }
  
  function checkUnderline() {
    if (target && isInViewport(target)) {
      target.classList.add('visible');
      window.removeEventListener('scroll', checkUnderline); // On supprime le listener après
    }
  }

  window.addEventListener('scroll', checkUnderline);
  checkUnderline(); // Vérifie à l'ouverture
});

function isElementInViewportMiddle(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const middle = windowHeight / 2;
  // La zone "milieu" est +/- 100px autour du centre de la fenêtre
  return (
    rect.top < middle + 100 &&
    rect.bottom > middle - 100
  );
}

function checkTimelineBlocks() {
  document.querySelectorAll('.timeline-content').forEach(function(block) {
    if (isElementInViewportMiddle(block)) {
      block.classList.add('in-view');
    } else {
      block.classList.remove('in-view');
    }
  });
}

// Initial check
window.addEventListener('DOMContentLoaded', checkTimelineBlocks);
window.addEventListener('scroll', checkTimelineBlocks);
window.addEventListener('resize', checkTimelineBlocks);



// dark/light mode
const btnLight = document.getElementById('light-mode-btn');
const btnDark = document.getElementById('dark-mode-btn');
const body = document.body;

// Appliquer le mode au démarrage
if (localStorage.getItem('theme') === 'light') {
  body.classList.remove('dark-mode');
  body.classList.add('light-mode');
  btnLight.style.display = 'none';
  btnDark.style.display = '';
} else {
  body.classList.add('dark-mode');
  btnLight.style.display = '';
  btnDark.style.display = 'none';
}

// Bouton light
btnLight.addEventListener('click', () => {
  body.classList.remove('dark-mode');
  body.classList.add('light-mode');
  localStorage.setItem('theme', 'light');
  btnLight.style.display = 'none';
  btnDark.style.display = '';
});

// Bouton dark
btnDark.addEventListener('click', () => {
  body.classList.remove('light-mode');
  body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
  btnDark.style.display = 'none';
  btnLight.style.display = '';
});



function animateCardsOnScroll() {
  const cards = document.querySelectorAll('.cards-row .card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const threshold = window.innerHeight * 0.88;
    if (rect.top < threshold) {
      card.classList.add('in-view');
    } else {
      card.classList.remove('in-view'); // optionnel
    }
  });
}

window.addEventListener('scroll', animateCardsOnScroll);
window.addEventListener('load', animateCardsOnScroll);


function animateTimelineOnScroll() {
  const timeline = document.querySelector('.timeline-chronology');
  if (!timeline) return;
  const rect = timeline.getBoundingClientRect();
  const threshold = window.innerHeight * 0.88;
  if (rect.top < threshold) {
    timeline.classList.add('in-view');
  } else {
    timeline.classList.remove('in-view'); // Si tu veux qu'il disparaisse en quittant la vue
  }
}

window.addEventListener('scroll', animateTimelineOnScroll);
window.addEventListener('load', animateTimelineOnScroll);

//caroussel
document.addEventListener('DOMContentLoaded', () => {
  const group = document.querySelector('.publications-carousel .group');
  if (!group) return;

  const items = Array.from(group.children);
  // On clone tous les items une fois pour créer la "bande" double
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // pour l’accessibilité
    group.appendChild(clone);
  });
});

// caroussel (duplication)
document.addEventListener('DOMContentLoaded', () => {
  const group = document.querySelector('.publications-carousel .group');
  if (!group) return;

  const items = Array.from(group.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    group.appendChild(clone);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('pubModalOverlay');
  const panel = document.getElementById('pubModalPanel');
  const modalImage = document.getElementById('pubModalImage');
  const modalTitle = document.getElementById('pubModalTitle');
  const modalMeta = document.getElementById('pubModalMeta');
  const modalDescription = document.getElementById('pubModalDescription');
  const closeBtn = document.getElementById('pubModalCloseBtn');
  const nextBtn = document.querySelector('.pub-modal-next-btn');
  const prevBtn = document.querySelector('.pub-modal-prev-btn');

  const images = document.querySelectorAll('.publications-carousel .group img');

  let descriptionPages = [];
  let currentPageIndex = 0;

  function updateButtonsVisibility() {
    if (!prevBtn || !nextBtn) return;

    const lastIndex = descriptionPages.length - 1;

    // Bouton "Page précédente": caché sur la première page
    prevBtn.style.visibility = currentPageIndex === 0 ? 'hidden' : 'visible';

    // Bouton "Page suivante": caché sur la dernière page
    nextBtn.style.visibility = currentPageIndex === lastIndex ? 'hidden' : 'visible';
  }

  function renderCurrentPage() {
    if (!descriptionPages.length) return;
    modalDescription.innerHTML = descriptionPages[currentPageIndex];
    modalDescription.scrollTop = 0;
    updateButtonsVisibility();
  }

  images.forEach(img => {
    img.addEventListener('click', () => {
      const title = img.dataset.title || img.alt || '';
      const meta = img.dataset.meta || '';
      const descriptionRaw = img.dataset.description || '';

      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalTitle.textContent = title;
      modalMeta.textContent = meta;

      const q1 = 'De quoi ça parle ?';
      const q2 = 'Pourquoi l’avoir écrit ?';
      const q3 = 'Pourquoi le lire ?';

      const i1 = descriptionRaw.indexOf(q1);
      const i2 = descriptionRaw.indexOf(q2);
      const i3 = descriptionRaw.indexOf(q3);

      descriptionPages = [];

      if (i1 !== -1) {
        const end1 = i2 !== -1 ? i2 : descriptionRaw.length;
        const part1 = descriptionRaw.substring(i1, end1).trim();
        descriptionPages.push(
          '<strong>' + q1 + '</strong>' +
        ' ' + part1.replace(q1, '').trim()
        );
      }

      if (i2 !== -1) {
        const end2 = i3 !== -1 ? i3 : descriptionRaw.length;
        const part2 = descriptionRaw.substring(i2, end2).trim();
        descriptionPages.push(
          '<strong>' + q2 + '</strong>' +
          ' ' + part2.replace(q2, '').trim()
        );
      }

      if (i3 !== -1) {
        const part3 = descriptionRaw.substring(i3).trim();
        descriptionPages.push(
          '<strong>' + q3 + '</strong>' +
          ' ' + part3.replace(q3, '').trim()
        );
      }

      if (!descriptionPages.length) {
        descriptionPages.push(descriptionRaw);
      }

      currentPageIndex = 0;
      renderCurrentPage();

      overlay.classList.add('open');
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    modalImage.src = '';
    descriptionPages = [];
    currentPageIndex = 0;
    if (modalDescription) modalDescription.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', event => {
    if (!panel.contains(event.target)) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Page suivante
  if (nextBtn && modalDescription) {
    nextBtn.addEventListener('click', () => {
      if (!descriptionPages.length) return;
      const lastIndex = descriptionPages.length - 1;
      if (currentPageIndex < lastIndex) {
        currentPageIndex += 1;
        renderCurrentPage();
      }
    });
  }

  // Page précédente
  if (prevBtn && modalDescription) {
    prevBtn.addEventListener('click', () => {
      if (!descriptionPages.length) return;
      if (currentPageIndex > 0) {
        currentPageIndex -= 1;
        renderCurrentPage();
      }
    });
  }
});



// ----------- Carrousel "Architecture du site" -----------
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.arch-track');
  const slides = document.querySelectorAll('.arch-slide');
  const prevBtn = document.querySelector('.arch-arrow-prev');
  const nextBtn = document.querySelector('.arch-arrow-next');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function updateCarousel(newIndex) {
    currentIndex = newIndex;

    // Translate la piste
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    // Gère les états actifs / aria-hidden
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', (!isActive).toString());
    });

    // Gère l'état des boutons
    if (currentIndex === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentIndex === slides.length - 1) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      updateCarousel(currentIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      updateCarousel(currentIndex + 1);
    }
  });

  // Option : navigation clavier avec flèches gauche/droite
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && !nextBtn.disabled) {
      nextBtn.click();
    } else if (event.key === 'ArrowLeft' && !prevBtn.disabled) {
      prevBtn.click();
    }
  });

  // Initialisation
  updateCarousel(0);
});


document.addEventListener('DOMContentLoaded', () => {
  const mainLightBtn = document.getElementById('light-mode-btn');
  const mainDarkBtn = document.getElementById('dark-mode-btn');
  const asideLightBtn = document.getElementById('light-mode-btn-aside');
  const asideDarkBtn = document.getElementById('dark-mode-btn-aside');

  function setLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    if (mainLightBtn && mainDarkBtn) {
      mainLightBtn.style.display = 'none';
      mainDarkBtn.style.display = 'inline-block';
    }
  }

  function setDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    if (mainLightBtn && mainDarkBtn) {
      mainLightBtn.style.display = 'inline-block';
      mainDarkBtn.style.display = 'none';
    }
  }

  if (asideLightBtn) {
    asideLightBtn.addEventListener('click', setLightMode);
  }
  if (asideDarkBtn) {
    asideDarkBtn.addEventListener('click', setDarkMode);
  }

  // (tu gardes ton code existant qui écoute mainLightBtn / mainDarkBtn,
  // et qui gère le localStorage si tu l’as mis en place)
});


document.addEventListener('DOMContentLoaded', () => {
  const mainLightBtn = document.getElementById('light-mode-btn');
  const mainDarkBtn  = document.getElementById('dark-mode-btn');
  const themeSwitch  = document.getElementById('themeSwitch');

  function applyThemeClasses(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      if (mainLightBtn && mainDarkBtn) {
        mainLightBtn.style.display = 'none';
        mainDarkBtn.style.display  = 'inline-block';
      }
      if (themeSwitch) {
        themeSwitch.classList.add('is-on');
        themeSwitch.setAttribute('aria-pressed', 'true');
      }
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      if (mainLightBtn && mainDarkBtn) {
        mainLightBtn.style.display = 'inline-block';
        mainDarkBtn.style.display  = 'none';
      }
      if (themeSwitch) {
        themeSwitch.classList.remove('is-on');
        themeSwitch.setAttribute('aria-pressed', 'false');
      }
    }
  }

  // Si tu utilises déjà localStorage, garde ta logique existante :
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    applyThemeClasses(true);
  } else if (savedTheme === 'dark') {
    applyThemeClasses(false);
  }

  // Clic sur le switch (on inverse le thème)
  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-mode');
      const newIsLight = !isCurrentlyLight;
      applyThemeClasses(newIsLight);
      localStorage.setItem('theme', newIsLight ? 'light' : 'dark');
    });
  }

  // Garder tes handlers existants sur les boutons ☀️ / 🌙 de la navbar
  if (mainLightBtn) {
    mainLightBtn.addEventListener('click', () => {
      applyThemeClasses(true);
      localStorage.setItem('theme', 'light');
    });
  }
  if (mainDarkBtn) {
    mainDarkBtn.addEventListener('click', () => {
      applyThemeClasses(false);
      localStorage.setItem('theme', 'dark');
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const typingTarget = document.getElementById("goals-typing-text");

  if (!typingTarget) return;

  const text = "Ce site a été imaginé pour un public intéressé par les sciences de l'information, les médias, la recherche universitaire et les transformations numériques. L'objectif principal est de rendre les travaux d'Andrew Hoskins accessibles, structurés et compréhensibles, y compris pour un public non spécialiste.";

  // Insérer le paragraphe complet (pas d'animation mot par mot)
  typingTarget.textContent = text;

  // Animation au scroll avec IntersectionObserver
  // Observer partagé : applique .in-view à tout élément observé
  const themeText = document.querySelector('.about-theme-text');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ajouter .in-view directement à l'élément visible
        entry.target.classList.add('in-view');
        // on arrête d'observer une fois visible
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(typingTarget);
  if (themeText) observer.observe(themeText);
});












