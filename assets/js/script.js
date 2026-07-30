document.addEventListener("DOMContentLoaded", () => {
  /*==========================================================================
      1. MOBILE MENU TOGGLE
  ==========================================================================*/
  const menuBtn = document.querySelector(".menu-btn") || document.querySelector(".burger");
  const navbar = document.querySelector(".navbar") || document.querySelector(".nav-links");

  if (menuBtn && navbar) {
    const toggleMenuIcon = (isOpen) => {
      const icon = menuBtn.querySelector("i");
      if (icon) {
        if (isOpen) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    };

    // Toggle Buka / Tutup Menu saat tombol diklik
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = navbar.classList.toggle("active");
      toggleMenuIcon(isActive);
    });

    // Tutup menu saat link navbar diklik
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        toggleMenuIcon(false);
      });
    });

    // Tutup menu jika pengguna mengklik di luar area navbar & tombol
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        if (navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          toggleMenuIcon(false);
        }
      }
    });
  }

  /*==========================================================================
      2. SCROLL EVENTS (STICKY HEADER, ACTIVE NAV LINK & SCROLL REVEAL)
  ==========================================================================*/
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a, .nav-links a");
  const revealElements = document.querySelectorAll("section, .section");
  const header = document.querySelector(".header");

  let isTicking = false;

  function handleScrollEvents() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // Sticky Header
    if (header) {
      header.classList.toggle("sticky", scrollPosition > 50);
    }

    // Highlighting Nav Link berdasarkan Seksi Aktif
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (currentSectionId && link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });

    // Scroll Reveal Animation
    revealElements.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        element.classList.add("show");
      }
    });

    isTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(handleScrollEvents);
      isTicking = true;
    }
  });

  window.addEventListener("resize", handleScrollEvents);
  handleScrollEvents(); // Jalankan sekali saat dimuat
  
  /*==========================================================================
      3. TYPING EFFECT
  ==========================================================================*/
  const typingElement = document.getElementById("typing-text");

  if (typingElement) {
    const words = [
      "Junior Web Developer",
      "Frontend Developer",
      "Backend Enthusiast",
      "PPLG Student"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1800; // Delay before starting delete
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  /*==========================================================================
      4. BUTTON RIPPLE EFFECT
  ==========================================================================*/
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  /*==========================================================================
      EXPERIENCE TAB TOGGLE (OTOMATIS)
  ==========================================================================*/
  const expBtns = document.querySelectorAll(".exp-btn");
  const expContents = document.querySelectorAll(".exp-content");

  expBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      if (!targetContent) return;

      // Reset semua status active
      expBtns.forEach((b) => b.classList.remove("active"));
      expContents.forEach((c) => c.classList.remove("active"));

      // Aktifkan tab yang diklik
      btn.classList.add("active");
      targetContent.classList.add("active");
    });
  });
});

/*==============================================================================
    LOGIKA EXP MODAL DETAIL KEGIATAN
==============================================================================*/
function openExpModal(title, company, imgSrc, points) {
  const modal = document.getElementById("expModal");
  if (!modal) return;

  document.getElementById("expModalTitle").innerText = title;
  document.getElementById("expModalCompany").innerText = "@ " + company;
  document.getElementById("expModalImg").src = imgSrc;

  // Render Poin-poin Kegiatan
  const listContainer = document.getElementById("expModalList");
  listContainer.innerHTML = "";

  if (Array.isArray(points)) {
    points.forEach((point) => {
      const li = document.createElement("li");
      li.innerText = point;
      listContainer.appendChild(li);
    });
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Menghindari scroll saat modal terbuka
}

function closeExpModal() {
  const modal = document.getElementById("expModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Tutup modal jika mengklik luar area card
window.addEventListener("click", (e) => {
  const modal = document.getElementById("expModal");
  if (e.target === modal) {
    closeExpModal();
  }
});

/*==========================================================================
    6. FILTER SKILLS & TOOLS
==========================================================================*/
function filterSkills(category, e) {
  const buttons = document.querySelectorAll(".skills-toggle .toggle-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  const targetBtn = e ? e.currentTarget : window.event ? window.event.target : null;
  if (targetBtn) {
    targetBtn.classList.add("active");
  }

  const items = document.querySelectorAll(".skill-item");
  items.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    if (category === "all" || itemCategory === category) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/*==========================================================================
    7. PROJECT DETAIL MODAL LOGIC
==========================================================================*/
function openModal(title, desc, image, githubUrl, techs) {
  const projectModal = document.getElementById("projectModal");
  if (!projectModal) return;

  const titleEl = document.getElementById("modalTitle");
  const descEl = document.getElementById("modalDesc") || document.getElementById("modalDescription");
  const imgEl = document.getElementById("modalImg") || document.getElementById("modalImage");
  const githubEl = document.getElementById("modalGithub");
  const techContainer = document.getElementById("modalTechs") || document.getElementById("modalTech");

  if (titleEl) titleEl.innerText = title;
  if (descEl) descEl.innerText = desc;
  if (imgEl) imgEl.src = image;
  if (githubEl) githubEl.href = githubUrl;

  // Render Tags
  if (techContainer) {
    techContainer.innerHTML = "";
    if (Array.isArray(techs)) {
      techs.forEach((tech) => {
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.innerText = tech.startsWith("#") ? tech : `#${tech}`;
        techContainer.appendChild(tag);
      });
    }
  }

  projectModal.classList.add("active");
  projectModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const projectModal = document.getElementById("projectModal");
  if (!projectModal) return;

  projectModal.classList.remove("active");
  projectModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  const projectModal = document.getElementById("projectModal");
  if (e.target === projectModal) {
    closeModal();
  }
});

/*==========================================================================
    8. PRELOADER & PAGE LOAD
==========================================================================*/
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  const preloader = document.getElementById("preloader") || document.getElementById("loader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 500);
  }
});fro

/*==========================================================================
    9. CONSOLE WELCOME MESSAGE
==========================================================================*/
console.log(
  "%c👋 Welcome to Portfolio!",
  "color:#38bdf8;font-size:18px;font-weight:bold;"
);
console.log(
  "%cDeveloped with ❤️ using HTML, CSS & JavaScript",
  "color:white;font-size:14px;"
);

function toggleGallery(button) {
  const gallery = button.nextElementSibling;
  
  // Toggle class active dan open
  button.classList.toggle('active');
  gallery.classList.toggle('open');
  
  // Ubah ikon & teks secara otomatis
  const isExpanded = gallery.classList.contains('open');
  button.innerHTML = isExpanded 
    ? '<i class="bx bx-images"></i> Sembunyikan Dokumentasi <i class="bx bx-chevron-down arrow-icon"></i>'
    : '<i class="bx bx-images"></i> Lihat Dokumentasi <i class="bx bx-chevron-down arrow-icon"></i>';
}