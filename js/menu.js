document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category-pill");
  const sections = document.querySelectorAll(".menu-section");
  const detailButtons = document.querySelectorAll(".menu-detail-btn");
  const cards = document.querySelectorAll(".menu-card");

  const modal = document.getElementById("menuModal");
  const closeModal = document.getElementById("closeMenuModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalExtra = document.getElementById("modalExtra");
  const modalImg = document.querySelector(".menu-modal-img");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      sections.forEach((section) => {
        const sectionCategory = section.dataset.section;

        if (category === "all" || sectionCategory === category) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });

  function openModal(card) {
    if (!card) return;

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

  detailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const card = button.closest(".menu-card");
      openModal(card);
    });

    button.addEventListener("touchend", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const card = button.closest(".menu-card");
      openModal(card);
    }, { passive: false });
  });

  cards.forEach((card) => {
    card.addEventListener("dblclick", () => {
      openModal(card);
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  });

  closeModal.addEventListener("touchend", (event) => {
    event.preventDefault();
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }, { passive: false });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  });

  modal.addEventListener("touchend", (event) => {
    if (event.target === modal) {
      event.preventDefault();
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  }, { passive: false });
});
