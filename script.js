
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // 1. Footer yılını otomatik güncelle
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // 2. Bootstrap mobil menüsü
  const navbarMenu = document.getElementById("navbarMenu");
  const navLinks = document.querySelectorAll("#navbarMenu .nav-link");

  // Menüdeki bir bağlantıya tıklanınca mobil menüyü kapat
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (
        navbarMenu &&
        navbarMenu.classList.contains("show") &&
        window.bootstrap
      ) {
        const collapseInstance =
          window.bootstrap.Collapse.getOrCreateInstance(navbarMenu, {
            toggle: false
          });

        collapseInstance.hide();
      }
    });
  });

  // 3. Aktif navigasyon bağlantısını güncelle
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveLink() {
    let activeSection = "anasayfa";

    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {
      if (scrollPosition >= section.offsetTop) {
        activeSection = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive =
        link.getAttribute("href") === "#" + activeSection;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Sayfa açıldığında ve kaydırıldığında çalıştır
  updateActiveLink();

  let ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActiveLink();
          ticking = false;
        });

        ticking = true;
      }
    },
    { passive: true }
  );
});
