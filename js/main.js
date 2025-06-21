// main.js
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.init({ duration: 1000, once: true });

    const toggleBtn = document.querySelector(".menu-toggle");
    const nav = document.getElementById("mainNav");

    if (toggleBtn && nav) {
      toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("nav-visible");  // 👈 fix here
      });

      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("nav-visible");  // 👈 and here
        });
      });
    }
  }, 150);
});
