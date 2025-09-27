// navigation.js
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  // toggle class to show nav on small screens
  if (mainNav.style.display === 'block') {
    mainNav.style.display = '';
  } else {
    mainNav.style.display = 'block';
  }
});
