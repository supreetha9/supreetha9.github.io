document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navAnchors = navLinks.querySelectorAll("a");
  const sections = document.querySelectorAll("section[id]");

  // Scroll-reveal via Intersection Observer
  const fadeEls = document.querySelectorAll(".fade-in");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => revealObserver.observe(el));

  // Sticky nav shadow on scroll
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  // Active section highlighting
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -70% 0px" }
  );
  sections.forEach((sec) => sectionObserver.observe(sec));

  // Mobile hamburger toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close mobile nav on link click
  navAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
});
