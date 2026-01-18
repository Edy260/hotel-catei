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
