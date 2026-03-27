document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category-pill");
  const sections = document.querySelectorAll(".menu-section");
  const detailButtons = document.querySelectorAll(".menu-detail-btn");
  const cards = document.querySelectorAll(".menu-card");

  const modal = document.getElementById("menuModal");
  const closeModalBtn = document.getElementById("closeMenuModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalExtra = document.getElementById("modalExtra");
  const modalImg = document.querySelector(".menu-modal-img");

  function openModal(card) {
    if (!card || !modal) return;

    modalTitle.textContent = card.dataset.title || "";
    modalPrice.textContent = card.dataset.price || "";
    modalDescription.textContent = card.dataset.description || "";
    modalExtra.textContent = card.dataset.extra || "";

    const imgDiv = card.querySelector(".menu-card-img");
    if (imgDiv && modalImg) {
      const bg = window.getComputedStyle(imgDiv).backgroundImage;
      modalImg.style.backgroundImage = bg;
    }

    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      sections.forEach((section) => {
        const sectionCategory = section.dataset.section;
        const shouldShow = category === "all" || sectionCategory === category;

        if (shouldShow) {
          section.style.display = "block";
          requestAnimationFrame(() => {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
          });
        } else {
          section.style.opacity = "0";
          section.style.transform = "translateY(18px)";
          setTimeout(() => {
            if (section.style.opacity === "0") {
              section.style.display = "none";
            }
          }, 220);
        }
      });
    });
  });

  detailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const card = button.closest(".menu-card");
      openModal(card);
    });

    button.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        const card = button.closest(".menu-card");
        openModal(card);
      },
      { passive: false }
    );
  });

  cards.forEach((card) => {
    card.addEventListener("dblclick", () => {
      openModal(card);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);

    closeModalBtn.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
      },
      { passive: false }
    );
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    modal.addEventListener(
      "touchend",
      (event) => {
        if (event.target === modal) {
          event.preventDefault();
          closeModal();
        }
      },
      { passive: false }
    );
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  const revealItems = document.querySelectorAll(
    ".hero-overlay, .about, .featured, .cta, .menu-hero, .menu-section, .reservas-hero, .reservas-form-section, .card, .menu-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("active"));
  }
});
