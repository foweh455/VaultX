const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    counter.textContent = `${prefix}${value.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      if (entry.target.matches("[data-counter]") && !entry.target.dataset.started) {
        entry.target.dataset.started = "true";
        animateCounter(entry.target);
      }

      if (!entry.target.matches("[data-counter]")) {
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.22,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));
counters.forEach((counter) => observer.observe(counter));
