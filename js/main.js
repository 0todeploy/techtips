// main.js
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.init({ duration: 1000, once: true });

    const toggleBtn = document.querySelector(".menu-toggle");
    const nav = document.getElementById("mainNav");

    if (toggleBtn && nav) {
      toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("nav-visible");
        playSound("sounds/menuopen.mp3");
      });

      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("nav-visible");
          playSound("sounds/menuclose.mp3");
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
        playSound("sounds/typing.mp3");
        const url = "https://www.google.com/search?q=site:techtips.0todeploy.com+" + encodeURIComponent(query);
        window.open(url, "_blank");
        return false;
      });
    }

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

    // ---- Airplane Button Handler ----
    setTimeout(() => {
      const planeBtn = document.querySelector(".airplane-btn");
      if (planeBtn) {
        planeBtn.addEventListener("click", () => {
          playSound("sounds/planepass.mp3");
          planeBtn.classList.add("fly-fast");
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => planeBtn.classList.remove("fly-fast"), 1000);
        });
      }
    }, 500);

    // ---- Clipboard Copy Sound ----
    document.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("sounds/copy.mp3");
      });
    });

    // ---- Error Trigger Sound ----
    document.querySelectorAll(".error-trigger").forEach(el => {
      el.addEventListener("click", () => {
        playSound("sounds/error.mp3");
      });
    });

    // ---- Easter Egg Sound + Animation ----
   const easterTrigger = document.getElementById("secret-logo");
if (easterTrigger) {
  easterTrigger.addEventListener("click", () => {
    playSound("sounds/reveal.mp3");
    easterTrigger.classList.add("easter-flash", "glitch");
    setTimeout(() => {
      easterTrigger.classList.remove("easter-flash", "glitch");
      window.open("https://t.me/+XSUerZTU7gYzYjk1", "_blank");
    }, 1000);
  });
}

    // ---- Hover Sound ----
    document.querySelectorAll(".hover-sound").forEach(el => {
      el.addEventListener("mouseenter", () => {
        playSound("sounds/hover.mp3");
      });
    });

    // ---- Click Sound ----
    document.querySelectorAll(".click-sound").forEach(el => {
      el.addEventListener("click", () => {
        playSound("sounds/click.mp3");
      });
    });

    // ---- Logo Animation ----
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.classList.add("logo-pop");
      logo.addEventListener("mouseenter", () => {
        logo.classList.add("logo-glow");
      });
      logo.addEventListener("mouseleave", () => {
        logo.classList.remove("logo-glow");
      });
    }

  }, 150);
});
