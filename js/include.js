// File: js/include.js
function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => el.innerHTML = data)
      .catch(() => el.innerHTML = "Include failed: " + file);
  });
}

window.onload = includeHTML;
