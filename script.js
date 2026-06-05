// ── FusionAlpha script.js (7-section narrative) ──
// Handles: scroll state, reveal, counters, mobile nav

const panels = [...document.querySelectorAll(".panel")];
const progressDots = [...document.querySelectorAll(".scroll-index span")];
const fusionBgs = [...document.querySelectorAll(".fusion-bg-frame")];

const state = {
  width: 0,
  height: 0,
  scroll: 0,
  activePanel: 0,
  time: 0,
};

function updateScrollState() {
  state.scroll = window.scrollY;
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  const center = state.scroll + state.height * 0.5;
  let nearest = 0;
  let distance = Number.POSITIVE_INFINITY;

  panels.forEach((panel, index) => {
    const panelCenter = panel.offsetTop + panel.offsetHeight * 0.5;
    const nextDistance = Math.abs(center - panelCenter);
    if (nextDistance < distance) {
      nearest = index;
      distance = nextDistance;
    }
  });

  if (nearest !== state.activePanel) {
    state.activePanel = nearest;
    progressDots.forEach((dot, index) => dot.classList.toggle("active", index === nearest));
  }

  updateFusionBackground();
}

function updateFusionBackground() {
  if (!fusionBgs.length) return;

  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  const payload = {
    type: "fusion-bg-view",
    progress,
    panel: state.activePanel,
    count: panels.length,
  };

  fusionBgs.forEach((frame) => frame.contentWindow?.postMessage(payload, "*"));
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function setupCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    els.forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      el.textContent = (target >= 1000 ? target.toLocaleString() : String(target)) + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1600;
        const startTime = performance.now();

        function tick(now) {
          const p = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const val = Math.round(target * eased);
          el.textContent = val >= 1000 ? val.toLocaleString() : String(val);
          el.textContent += suffix;
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  els.forEach((el) => observer.observe(el));
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    mobileNav.classList.toggle("is-open", open);
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
      mobileNav.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState, { passive: true });
fusionBgs.forEach((frame) => {
  frame.addEventListener("load", () => {
    updateFusionBackground();
  });
});

updateScrollState();
setupReveal();
setupCounters();
setupMobileNav();
setupHeaderAutoHide();
setupNavDropdowns();

// Dropdown menu toggle — click to open, click outside to close
function setupNavDropdowns() {
  const toggles = document.querySelectorAll('.nav-dropdown-toggle');
  if (!toggles.length) return;

  toggles.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Close all others
      toggles.forEach(function(b) {
        b.setAttribute('aria-expanded', 'false');
        var menu = b.nextElementSibling;
        if (menu) menu.classList.remove('is-open');
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        var menu = btn.nextElementSibling;
        if (menu) menu.classList.add('is-open');
      }
    });
  });

  document.addEventListener('click', function() {
    toggles.forEach(function(btn) {
      btn.setAttribute('aria-expanded', 'false');
      var menu = btn.nextElementSibling;
      if (menu) menu.classList.remove('is-open');
    });
  });
}

// Auto-hide the site header when the user scrolls DOWN; reveal it on scroll UP.
function setupHeaderAutoHide() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastY = window.scrollY || 0;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const dy = y - lastY;
      // Always show near the top
      if (y < 80) {
        header.classList.remove('is-hidden');
      } else if (dy > 4) {
        header.classList.add('is-hidden');
        // Also close mobile nav if open
        const toggle = document.querySelector('.nav-toggle.open');
        if (toggle) toggle.click();
      } else if (dy < -4) {
        header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}
