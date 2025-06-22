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

    // ---- Sound Toggle Logic ----
    const soundToggle = document.getElementById("soundToggle");
    const soundState = localStorage.getItem("soundEnabled");
    let soundEnabled = soundState === "true";

    const updateSoundIcon = () => {
      if (soundToggle) {
        soundToggle.innerHTML = soundEnabled
          ? '<i class="fas fa-volume-up"></i>'
          : '<i class="fas fa-volume-mute"></i>';
      }
    };

    if (soundToggle) {
      soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem("soundEnabled", soundEnabled);
        updateSoundIcon();
      });
      updateSoundIcon();
    }
  // Airplane button sound + scroll to top
   const planeBtn = document.querySelector(".airplane-btn");
   if (planeBtn) {
     planeBtn.addEventListener("click", () => {
       playSound("sounds/planepass.mp3");
       window.scrollTo({ top: 0, behavior: "smooth" });
     });
}

    // Ask for permission only on first visit
    if (soundState === null) {
      setTimeout(() => {
        const allow = confirm("Do you want to enable sound effects on this site?");
        localStorage.setItem("soundEnabled", allow);
        soundEnabled = allow;
        updateSoundIcon();
      }, 500);
    }

    // Global sound play function
    window.playSound = (src) => {
      if (!soundEnabled) return;
      const audio = new Audio(src);
      audio.play().catch(() => {});
    };
    // ---- END Sound Toggle ----

  }, 150);
});
