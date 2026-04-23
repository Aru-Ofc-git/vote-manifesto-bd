(function () {
  "use strict";

  // ========== DYNAMIC COPYRIGHT YEAR ==========
  // Automatically updates footer copyright with current year in English
  const copyrightEl = document.getElementById("copyrightText");
  if (copyrightEl) {
    const currentYear = new Date().getFullYear();
    copyrightEl.innerHTML = `<i class="far fa-copyright"></i> ${currentYear} Rayhan Campaign. All Rights Reserved.`;
  }

  // ========== CUSTOM CURSOR ==========
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor hover effects on interactive elements
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursorRing.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursorRing.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });

  // ========== SCROLL PROGRESS & NAVBAR ==========
  window.addEventListener("scroll", () => {
    const scrolled =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.getElementById("scrollProgress").style.transform =
      `scaleX(${scrolled})`;

    // Navbar background on scroll
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active nav link highlighting based on visible section
    const sections = ["hero", "about", "manifesto", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.add("active");
      }
    });
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        document.getElementById("mobile-menu").style.display = "none";
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    });
  });

  // ========== MOBILE MENU TOGGLE ==========
  document.getElementById("mobileToggle").addEventListener("click", () => {
    const menu = document.getElementById("mobile-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // ========== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ==========
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => observer.observe(el));

  // Separate observer for timeline items (triggers once)
  const tlObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          tlObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".tl-item")
    .forEach((item) => tlObserver.observe(item));
})();
