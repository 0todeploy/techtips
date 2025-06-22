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

    if (soundState === null) {
      setTimeout(() => {
        const allow = confirm("Do you want to enable sound effects on this site?");
        localStorage.setItem("soundEnabled", allow);
        soundEnabled = allow;
        updateSoundIcon();
      }, 500);
    }

    window.playSound = (src) => {
      if (!soundEnabled) return;
      const audio = new Audio(src);
      audio.play().catch(() => {});
    };

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

    document.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("sounds/copy.mp3");
      });
    });

    document.querySelectorAll(".error-trigger").forEach(el => {
      el.addEventListener("click", () => {
        playSound("sounds/error.mp3");
      });
    });

    document.querySelectorAll(".hover-sound").forEach(el => {
      el.addEventListener("mouseenter", () => {
        playSound("sounds/hover.mp3");
      });
    });

    document.querySelectorAll(".click-sound").forEach(el => {
      el.addEventListener("click", () => {
        playSound("sounds/click.mp3");
      });
    });

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

    // Terminal Game Easter Egg Trigger - EXTREME MODE
    const terminal = document.getElementById("terminal-easter");
    const terminalOverlay = document.getElementById("terminal-overlay");
    const terminalCode = document.getElementById("terminal-code");
    const terminalInput = document.getElementById("terminal-input");
    const terminalSubmit = document.getElementById("terminal-submit");
    const terminalError = document.getElementById("terminal-error");
    const secretLogo = document.getElementById("secret-logo");

    // Hard encrypted challenges
    const puzzles = [
      { q: "Base64 decode: U3lzdGVt", a: "System" },
      { q: "Hex to ASCII: 46 49 52 45", a: "FIRE" },
      { q: "ROT13: Cnffjbeq", a: "Password" },
      { q: "Binary to Char: 01000011 01001111 01000100 01000101", a: "CODE" },
      { q: "XOR Key = 42, 75 ⊕ ? = 103", a: "M" }
    ];

    let currentAnswer = null;
    let wrongTries = 0;

    if (secretLogo) {
      secretLogo.addEventListener("click", () => {
        const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        terminalCode.textContent = puzzle.q;
        currentAnswer = puzzle.a;
        wrongTries = 0;
        terminalInput.value = "";
        terminalError.style.display = "none";
        terminal.classList.add("terminal-active");
        terminalOverlay.classList.add("terminal-active");
        playSound("sounds/typing.mp3");
        terminalInput.focus();
      });
    }

    if (terminalSubmit) {
      terminalSubmit.addEventListener("click", () => {
        const entered = terminalInput.value.trim();
        if (entered.toUpperCase() === currentAnswer.toUpperCase()) {
          playSound("sounds/reveal.mp3");
          terminal.classList.remove("terminal-active");
          terminalOverlay.classList.remove("terminal-active");
          setTimeout(() => {
            window.open("https://t.me/+XSUerZTU7gYzYjk1", "_blank");
          }, 500);
        } else {
          wrongTries++;
          playSound("sounds/error.mp3");
          terminalError.style.display = "block";
          terminalError.textContent = `Access Denied (${wrongTries}/3)`;
          terminalInput.value = "";
          terminalInput.focus();

          if (wrongTries >= 3) {
            terminalError.textContent = "LOCKED. Try again in 15 seconds.";
            terminalSubmit.disabled = true;
            terminalInput.disabled = true;
            setTimeout(() => {
              terminalError.style.display = "none";
              terminalSubmit.disabled = false;
              terminalInput.disabled = false;
              wrongTries = 0;
            }, 15000);
          }
        }
      });
    }

  }, 150);
});
