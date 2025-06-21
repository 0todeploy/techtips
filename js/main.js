// main.js
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.init({ duration: 1000, once: true });

    const toggleBtn = document.querySelector(".menu-toggle");
    const nav = document.getElementById("mainNav");

    if (toggleBtn && nav) {
      toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("nav-visible");
      });

      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("nav-visible");
        });
      });
    }

    // ---- CSP-Safe Site Search ----
    const searchForm = document.getElementById("site-search-form");
    const searchInput = document.getElementById("site-search-input");
    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query.length === 0) return false;
        const url = "https://www.google.com/search?q=site:techtips.0todeploy.com+" + encodeURIComponent(query);
        window.open(url, "_blank");
        return false;
      });
    }
    // ---- END Site Search ----

  }, 150);
});
