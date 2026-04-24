(function () {
  // Scroll progress
  window.addEventListener("scroll", () => {
    const scrolled =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.getElementById("scrollProgress").style.transform =
      `scaleX(${scrolled})`;

    if (window.scrollY > 80) {
      document.getElementById("navbar").classList.add("scrolled");
    } else {
      document.getElementById("navbar").classList.remove("scrolled");
    }

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

  // Smooth scroll
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

  // Mobile toggle
  document.getElementById("mobileToggle").addEventListener("click", () => {
    const menu = document.getElementById("mobile-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // ============================================
  // MANIFESTO ORDER FIX FOR MOBILE
  // Reorder items by data-order only on mobile
  // ============================================
  function reorderTimelineForMobile() {
    const timelineWrap = document.getElementById("timelineWrap");
    const timelineSpine = document.getElementById("timelineSpine");

    if (window.innerWidth <= 768) {
      // Collect ALL tl-items from both columns
      const allItems = timelineWrap.querySelectorAll(".tl-item");
      const itemsArray = Array.from(allItems);

      // Sort by data-order
      itemsArray.sort((a, b) => {
        return (
          parseInt(a.getAttribute("data-order")) -
          parseInt(b.getAttribute("data-order"))
        );
      });

      // Move all items directly into timeline-wrap in correct order
      itemsArray.forEach((item) => {
        timelineWrap.appendChild(item);
      });

      // Hide the columns and spine
      const leftCol = document.getElementById("timelineLeft");
      const rightCol = document.getElementById("timelineRight");
      if (leftCol) leftCol.style.display = "none";
      if (rightCol) rightCol.style.display = "none";
      if (timelineSpine) timelineSpine.style.display = "none";
    } else {
      // DESKTOP: Restore items to their original columns
      const leftCol = document.getElementById("timelineLeft");
      const rightCol = document.getElementById("timelineRight");

      if (leftCol && rightCol && timelineSpine) {
        leftCol.style.display = "";
        rightCol.style.display = "";
        timelineSpine.style.display = "";

        // Move items back to their original columns based on data-order
        const allItems = timelineWrap.querySelectorAll(".tl-item");
        allItems.forEach((item) => {
          const order = parseInt(item.getAttribute("data-order"));
          if (order % 2 === 1) {
            // Odd -> left column
            leftCol.appendChild(item);
          } else {
            // Even -> right column
            rightCol.appendChild(item);
          }
        });
      }
    }
  }

  // Run on load
  reorderTimelineForMobile();

  // Run on resize
  window.addEventListener("resize", reorderTimelineForMobile);

  // Intersection Observer
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

  // Hero entrance
  const heroElements = [
    { el: "#heroBadge", delay: 0.2 },
    { el: "#heroText", delay: 0.5 },
    { el: "#heroTagline", delay: 0.8 },
    { el: "#heroActions", delay: 1.0 },
    { el: "#heroStats", delay: 1.2 },
  ];
  heroElements.forEach(({ el, delay }) => {
    const element = document.querySelector(el);
    if (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      setTimeout(() => {
        element.style.transition = "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, delay * 1000);
    }
  });
})();
