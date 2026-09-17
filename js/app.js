const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const siteHeader = document.querySelector('.site-header');
const dropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

function closeDropdown() {
  dropdown?.classList.remove('open');
  dropdownToggle?.setAttribute('aria-expanded', 'false');
}

function setMenu(open) {
  menuToggle?.setAttribute('aria-expanded', String(open));
  mainNav?.classList.toggle('open', open);
  siteHeader?.classList.toggle('nav-open', open);
  document.body.classList.toggle('nav-locked', open);

  if (!open) closeDropdown();
}

function closeMobileMenu() {
  setMenu(false);
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

dropdownToggle?.addEventListener('click', (event) => {
  event.stopPropagation();

  const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';

  dropdownToggle.setAttribute('aria-expanded', String(!expanded));
  dropdown.classList.toggle('open', !expanded);
});

// Clic en el velo
siteHeader?.addEventListener('click', (event) => {
  if (event.target === siteHeader) closeMobileMenu();
});

// Clic fuera del dropdown
document.addEventListener('click', (event) => {
  if (dropdown && !dropdown.contains(event.target)) closeDropdown();
});

// Escape
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeDropdown();
  if (mainNav?.classList.contains('open')) closeMobileMenu();
});

// FAQ
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.toggle('open');

    button.setAttribute('aria-expanded', String(isOpen));
  });
});

// Enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    closeDropdown();
    if (window.innerWidth <= 1080) closeMobileMenu();
  });
});

// Volver a escritorio con el menú abierto
window.addEventListener('resize', () => {
  if (window.innerWidth > 1080 && mainNav?.classList.contains('open')) {
    closeMobileMenu();
  }
});