/* AAAI-27 Tutorial site — interactions (no dependencies). */
(function () {
  'use strict';

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  var closeNav = function () {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeNav();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 920) closeNav();
  });

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', function () {
    var root = document.documentElement;
    var stored = root.getAttribute('data-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var effective = stored || (prefersDark ? 'dark' : 'light');
    var next = effective === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });

  /* ---------- Active nav item ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navAnchors = Array.prototype.slice.call(navLinks.querySelectorAll('a'));

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (anchor) {
            anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) {
      el.classList.add('in');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Copy BibTeX ---------- */
  var copyButton = document.getElementById('copy-citation');
  var bibtex = document.getElementById('bibtex');

  if (copyButton && bibtex) {
    copyButton.addEventListener('click', function () {
      var text = bibtex.textContent.trim();
      var label = copyButton.querySelector('span');
      var done = function () {
        label.textContent = 'Copied!';
        setTimeout(function () {
          label.textContent = 'Copy';
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {
          label.textContent = 'Press Ctrl+C';
          setTimeout(function () {
            label.textContent = 'Copy';
          }, 1800);
        }
        document.body.removeChild(area);
      }
    });
  }
})();
