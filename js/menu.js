document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category-pill");
  const sections = document.querySelectorAll(".menu-section");

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
});
