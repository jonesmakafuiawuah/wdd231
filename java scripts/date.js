// date.js
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  const lastModifiedEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
});
