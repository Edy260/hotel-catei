/* ==========================================================
   Hotel Căței – JS global (MODIFICAT)
   - scroll: body.scrolled (rAF)
   - navbar: se ASCUNDE la scroll in jos si RAMANE ascuns (nu reapare la scroll in sus)
   - navbar: setare automata padding-top corect (mobil/desktop)
   - WhatsApp CTA
   - footer include
   - accordions (tarife sezon + servicii)
   - dog-signature reveal
========================================================== */

(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const navbar = qs(".navbar");

  /* ================================
     NAV HEIGHT -> padding-top corect
  ================================ */
  function syncNavHeight() {
    if (!navbar) return;
    const h = Math.ceil(navbar.getBoundingClientRect().height || navbar.offsetHeight || 0);
    if (h > 0) document.documentElement.style.setProperty("--nav-h", `${h}px`);
  }

  /* ================================
     SCROLL (un singur listener)
  ================================ */
  let lastY = Math.max(0, window.scrollY || 0);
  let ticking = false;

  const SHOW_AT = 20;     // aproape de top -> vizibil
  const HIDE_AFTER = 80;  // dupa cat scroll incepe sa ascunda
  const DOWN_DELTA = 12;  // sensibilitate ascundere

  function handleScroll() {
    const y = Math.max(0, window.scrollY || 0);

    // blur/umbră pe body
    document.body.classList.toggle("scrolled", y > 20);

    if (!navbar) {
      lastY = y;
      return;
    }

    // aproape de top -> vizibil
    if (y <= SHOW_AT) {
      navbar.classList.remove("nav--hidden");
      lastY = y;
      return;
    }

    const delta = y - lastY;

    // doar scroll jos ascunde
    if (delta > DOWN_DELTA && y > HIDE_AFTER) {
      navbar.classList.add("nav--hidden");
      lastY = y;
      return;
    }

    lastY = y;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  /* ================================
     Helpers
  ================================ */
  function openWhatsApp(phone, text) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function setupSingleOpenAccordion({
    root,
    itemSelector,
    buttonSelector,
    panelSelector,
    openClass,
  }) {
    const items = qsa(itemSelector, root);
    if (!items.length) return;

    const closeItem = (item) => {
      item.classList.remove(openClass);
      const btn = qs(buttonSelector, item);
      const panel = qs(panelSelector, item);
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (panel) {
        panel.style.maxHeight = "0px";
        panel.setAttribute("aria-hidden", "true");
      }
    };

    const openItem = (item) => {
      item.classList.add(openClass);
      const btn = qs(buttonSelector, item);
      const panel = qs(panelSelector, item);
      if (btn) btn.setAttribute("aria-expanded", "true");
      if (panel) {
        panel.setAttribute("aria-hidden", "false");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    };

    items.forEach((item) => {
      const btn = qs(buttonSelector, item);
      const panel = qs(panelSelector, item);
      if (!btn || !panel) return;

      closeItem(item);

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains(openClass);

        items.forEach((it) => {
          if (it !== item) closeItem(it);
        });

        if (isOpen) closeItem(item);
        else openItem(item);
      });
    });
  }

  /* ================================
     DOM READY
  ================================ */
  document.addEventListener("DOMContentLoaded", () => {
    syncNavHeight();
    handleScroll();

    // dog-signature reveal
    const ds = qs(".dog-signature");
    if (ds && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          ds.classList.add("in");
          obs.unobserve(ds);
        },
        { threshold: 0.15 }
      );
      obs.observe(ds);
    } else if (ds) {
      ds.classList.add("in");
    }

    // WhatsApp buttons
    const phone = "40735626065";

    const btnContact = qs("#btn-contact-whatsapp");
    if (btnContact) {
      btnContact.addEventListener("click", (e) => {
        e.preventDefault();
        const text =
          `Salut! Vreau mai multe detalii despre cazare pentru cățel.\n\n` +
          `• Nume: \n` +
          `• Talie / rasă: \n` +
          `• Perioada dorită: \n` +
          `• Alte detalii: `;
        openWhatsApp(phone, text);
      });
    }

    const btnTarife = qs("#btn-tarife-whatsapp");
    if (btnTarife) {
      btnTarife.addEventListener("click", (e) => {
        e.preventDefault();
        const text =
          `Salut! Aș dori o ofertă pentru cazare câine.\n\n` +
          `• Tip cameră (Standard/Confort/Premium/VIP): \n` +
          `• Perioada: \n` +
          `• Talie / rasă: \n` +
          `• Transport? (da/nu): \n` +
          `• Alte detalii: `;
        openWhatsApp(phone, text);
      });
    }

    // footer include
    const footerPlaceholder = qs("#footer-placeholder");
    if (footerPlaceholder) {
      const footerUrl = new URL("footer.html", window.location.href).toString();
      fetch(footerUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((html) => {
          footerPlaceholder.innerHTML = html;
        })
        .catch((err) => {
          console.error("Footer load error:", err);
        });
    }

    // Tarife sezon accordion
    const seasonAccordion = qs("#seasonAccordion");
    if (seasonAccordion) {
      setupSingleOpenAccordion({
        root: seasonAccordion,
        itemSelector: ".season-card.is-collapsible",
        buttonSelector: ".season-toggle",
        panelSelector: ".season-panel",
        openClass: "is-open",
      });
    }

    // Servicii accordions
    qsa(".service-accordion").forEach((acc) => {
      setupSingleOpenAccordion({
        root: acc,
        itemSelector: ".service-item",
        buttonSelector: ".service-btn",
        panelSelector: ".service-panel",
        openClass: "open",
      });
    });
  });

  /* ================================
     RESIZE (un singur handler)
  ================================ */
  window.addEventListener(
    "resize",
    () => {
      syncNavHeight();
      qsa(".season-card.is-open .season-panel, .service-item.open .service-panel").forEach(
        (panel) => {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      );
    },
    { passive: true }
  );
})();
/* ================================
   ADAUGA asta in app.js (in acelasi IIFE)
   inlocuieste syncNavHeight cu varianta de mai jos
================================ */
/* ===== in app.js (inlocuieste syncNavHeight cu asta) ===== */
function syncNavHeight() {
  if (!navbar) return;
  const h = Math.ceil(navbar.getBoundingClientRect().height || navbar.offsetHeight || 0);
  if (h > 0) document.documentElement.style.setProperty("--nav-h", `${h}px`);
}

