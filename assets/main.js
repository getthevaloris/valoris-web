// Nav glass effect on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
}, { passive: true });

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.r').forEach(el => observer.observe(el));

// ─── Language: toggle + persistence + autodetect ──────────────────
const langSwitch = document.getElementById('lang-switch');
const STORAGE_KEY = 'valoris-lang';

function applyLang(lang) {
  const isEs = lang === 'es';
  document.body.classList.toggle('es', isEs);
  document.documentElement.lang = lang;
  langSwitch.textContent = isEs ? 'EN' : 'ES';
  langSwitch.setAttribute('aria-label', isEs ? 'Read in English' : 'Ver en español');

  // Reveal .r elements inside Spanish blocks that the observer can't
  // see while they're display:none.
  if (isEs) {
    document.querySelectorAll('.tb-es .r').forEach(el => el.classList.add('on'));
  }

  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
}

// Determine initial language: saved preference → browser language → English
function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch (e) { /* private mode */ }
  const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return nav.startsWith('es') ? 'es' : 'en';
}

let siteLang = initialLang();
applyLang(siteLang);

langSwitch.addEventListener('click', () => {
  siteLang = siteLang === 'en' ? 'es' : 'en';
  applyLang(siteLang);
});
