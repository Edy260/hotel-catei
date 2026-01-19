/* ======================================
   BODY.scrolled (efect blur / umbră)
====================================== */
window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ======================================
   NAVBAR hide on scroll
====================================== */
(function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastY = window.scrollY;
  let ticking = false;

  function handleScroll() {
    const y = window.scrollY;

    // buffer anti-pâlpâire
    if (Math.abs(y - lastY) < 8) return;

    if (y > lastY && y > 80) {
      navbar.classList.add("nav--hidden"); // scroll jos
    } else {
      navbar.classList.remove("nav--hidden"); // scroll sus
    }

    lastY = y;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ======================================
   ANIMAȚIE apariție dog-signature
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const ds = document.querySelector(".dog-signature");
  if (!ds) return;

  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) ds.classList.add("in");
    },
    { threshold: 0.15 }
  );

  obs.observe(ds);
});

/* ======================================
   WhatsApp – Contact
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const btnContact = document.getElementById("btn-contact-whatsapp");
  if (!btnContact) return;

  btnContact.addEventListener("click", (e) => {
    e.preventDefault();

    const phone = "40735626065";
    const text =
      `Salut! Vreau mai multe detalii despre cazare pentru cățel.\n\n` +
      `• Nume: \n` +
      `• Talie / rasă: \n` +
      `• Perioada dorită: \n` +
      `• Alte detalii: `;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  });
});

/* ======================================
   WhatsApp – Tarife
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const btnTarife = document.getElementById("btn-tarife-whatsapp");
  if (!btnTarife) return;

  btnTarife.addEventListener("click", (e) => {
    e.preventDefault();

    const phone = "40735626065";
    const text =
      `Salut! Aș dori o ofertă pentru cazare câine.\n\n` +
      `• Tip cameră (Standard/Confort/Premium/VIP): \n` +
      `• Perioada: \n` +
      `• Talie / rasă: \n` +
      `• Transport? (da/nu): \n` +
      `• Alte detalii: `;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  });
});
/* ======================================
   INCLUDE FOOTER GLOBAL
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      footerPlaceholder.innerHTML = html;
    })
    .catch(err => {
      console.error("Footer load error:", err);
    });
});
/* ======================================
   TARIFE SEZON – ACCORDION (slide down)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.getElementById("seasonAccordion");
  if (!accordion) return;

  const cards = Array.from(
    accordion.querySelectorAll(".season-card.is-collapsible")
  );

  function closeCard(card) {
    card.classList.remove("is-open");
    const btn = card.querySelector(".season-toggle");
    const panel = card.querySelector(".season-panel");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (panel) {
      panel.style.maxHeight = "0px";
      panel.setAttribute("aria-hidden", "true");
    }
  }

  function openCard(card) {
    card.classList.add("is-open");
    const btn = card.querySelector(".season-toggle");
    const panel = card.querySelector(".season-panel");
    if (btn) btn.setAttribute("aria-expanded", "true");
    if (panel) {
      panel.setAttribute("aria-hidden", "false");
      panel.style.maxHeight = panel.scrollHeight + "px"; // slide smooth
    }
  }

  // init: inchide toate
  cards.forEach((card) => {
    const btn = card.querySelector(".season-toggle");
    const panel = card.querySelector(".season-panel");
    if (!btn || !panel) return;

    panel.style.maxHeight = "0px";
    panel.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", () => {
      const isOpen = card.classList.contains("is-open");

      // inchide restul
      cards.forEach((c) => {
        if (c !== card) closeCard(c);
      });

      // toggle curent
      if (isOpen) closeCard(card);
      else openCard(card);
    });
  });

  // resize: recalc pentru cel deschis
  window.addEventListener("resize", () => {
    const openPanel = accordion.querySelector(".season-card.is-open .season-panel");
    if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + "px";
  });
});
/* ======================================
   SERVICII – ACCORDION (slide down)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".service-accordion");
  if (!accordions.length) return;

  accordions.forEach((acc) => {
    const items = Array.from(acc.querySelectorAll(".service-item"));

    function closeItem(item) {
      item.classList.remove("open");
      const btn = item.querySelector(".service-btn");
      const panel = item.querySelector(".service-panel");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (panel) {
        panel.style.maxHeight = "0px";
        panel.setAttribute("aria-hidden", "true");
      }
    }

    function openItem(item) {
      item.classList.add("open");
      const btn = item.querySelector(".service-btn");
      const panel = item.querySelector(".service-panel");
      if (btn) btn.setAttribute("aria-expanded", "true");
      if (panel) {
        panel.setAttribute("aria-hidden", "false");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }

    // init inchis
    items.forEach((item) => {
      const btn = item.querySelector(".service-btn");
      const panel = item.querySelector(".service-panel");
      if (!btn || !panel) return;

      closeItem(item);

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // inchide restul DOAR in acelasi accordion
        items.forEach((it) => {
          if (it !== item) closeItem(it);
        });

        // toggle curent
        if (isOpen) closeItem(item);
        else openItem(item);
      });
    });

    // resize: recalc pentru cel deschis
    window.addEventListener("resize", () => {
      const openPanel = acc.querySelector(".service-item.open .service-panel");
      if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + "px";
    });
  });
});
