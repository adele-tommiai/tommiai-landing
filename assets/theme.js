/* Tema claro/oscuro — fija data-theme antes de pintar y cablea el toggle. */
(function () {
  try {
    var t = localStorage.getItem('tommi-theme');
    if (t !== 'dark' && t !== 'light') {
      t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  /* Activa las fuentes sin bloquear el render (media=print -> all) */
  try {
    var g = document.getElementById('gfonts');
    if (g) { if (g.sheet) g.media = 'all'; else g.addEventListener('load', function () { g.media = 'all'; }); }
  } catch (e) {}
  function wire() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('tommi-theme', next); } catch (e) {}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
