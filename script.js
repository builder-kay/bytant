function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    toast.style.transition = "opacity 220ms ease, transform 220ms ease";
    window.setTimeout(() => toast.remove(), 240);
  }, 2600);
}

function openWhatsApp(message) {
  const phone = "233507410361";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

function toggleModal(modal, shouldOpen) {
  if (!modal) return;
  modal.classList.toggle("hidden", !shouldOpen);
}

function wireModal(modalId, closeId) {
  const modal = document.getElementById(modalId);
  const close = document.getElementById(closeId);
  if (!modal) return null;

  if (close) {
    close.addEventListener("click", () => toggleModal(modal, false));
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(modal, false);
    }
  });

  return modal;
}

const donateModal = wireModal("donate-modal", "close-donate-modal");
const contactModal = wireModal("contact-modal", "close-contact-modal");
const servicesModal = wireModal("services-modal", "close-services-modal");

const menuToggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("mobile-drawer");
const drawerBackdrop = document.getElementById("drawer-backdrop");
const drawerClose = document.getElementById("drawer-close");

function toggleDrawer(shouldOpen) {
  if (!drawer || !drawerBackdrop || !menuToggle) return;
  drawer.classList.toggle("is-open", shouldOpen);
  drawerBackdrop.classList.toggle("is-open", shouldOpen);
  document.body.classList.toggle("drawer-open", shouldOpen);
  drawer.setAttribute("aria-hidden", String(!shouldOpen));
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));
}

function closeDrawer() {
  toggleDrawer(false);
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = drawer ? drawer.classList.contains("is-open") : false;
    toggleDrawer(!isOpen);
  });
}

[drawerBackdrop, drawerClose].forEach((control) => {
  if (control) control.addEventListener("click", closeDrawer);
});

document.querySelectorAll(".drawer-links a, .drawer-brand").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

document.querySelectorAll("#help-us-btn, [data-open-help]").forEach((button) => {
  button.addEventListener("click", () => {
    closeDrawer();
    toggleModal(donateModal, true);
  });
});

document.querySelectorAll("#nav-cta-btn, [data-open-contact]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    closeDrawer();
    toggleModal(contactModal, true);
  });
});

const copyEmailBtn = document.getElementById("copy-email-btn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.email || "teambytant@gmail.com";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("input");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      showToast("Email copied: teambytant@gmail.com");
    } catch (error) {
      showToast("Copy failed — teambytant@gmail.com");
    }
  });
}

if (window.matchMedia) {
  window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => {
    if (event.matches) closeDrawer();
  });
}

const contactServicesLink = document.getElementById("contact-services-link");
if (contactServicesLink) {
  contactServicesLink.addEventListener("click", () => toggleModal(contactModal, false));
}

const viewServicesButton = document.getElementById("view-services-btn");
if (viewServicesButton) {
  viewServicesButton.addEventListener("click", () => toggleModal(servicesModal, true));
}

function setupActiveNavigation() {
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"], .drawer-links a[href^="#"]'));
  if (!navLinks.length) return;

  const aboutIds = new Set([
    "mission",
    "identity",
    "brand",
    "values",
    "method",
  ]);

  const trackedIds = ["home", "products", "services", "open-source", "culture", "team", ...aboutIds];
  const sections = trackedIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  function navKeyForSection(sectionId) {
    if (!sectionId) return null;
    if (aboutIds.has(sectionId)) return "about";
    return sectionId;
  }

  function setActiveLink(activeKey) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const key = link.dataset.nav || (href ? href.slice(1) : "");
      const isActive = Boolean(activeKey) && key === activeKey;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveFromScroll() {
    const offset = window.innerHeight * 0.38;
    const current = sections.reduce((active, section) => {
      const top = section.getBoundingClientRect().top;
      return top <= offset ? section : active;
    }, null);

    setActiveLink(navKeyForSection(current ? current.id : null));
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (!href || href.length <= 1) return;
      const sectionId = href.slice(1);
      setActiveLink(navKeyForSection(sectionId));
    });
  });

  updateActiveFromScroll();
  window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
  window.addEventListener("resize", updateActiveFromScroll);
  window.addEventListener("hashchange", updateActiveFromScroll);
}

setupActiveNavigation();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function setupProductCarousel() {
  const track = document.getElementById("product-track");
  const prev = document.getElementById("product-prev");
  const next = document.getElementById("product-next");
  const dotsContainer = document.getElementById("product-dots");
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll(".product-card"));
  if (!slides.length) return;

  let index = 0;
  let touchStartX = 0;

  const dots = slides.map((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.className = "product-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show product ${slideIndex + 1}`);
    dot.addEventListener("click", () => {
      index = slideIndex;
      update();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  }

  function move(direction) {
    index = (index + direction + slides.length) % slides.length;
    update();
  }

  if (prev) prev.addEventListener("click", () => move(-1));
  if (next) next.addEventListener("click", () => move(1));

  track.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) {
      move(delta < 0 ? 1 : -1);
    }
  });

  update();
}

setupProductCarousel();

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeDrawer();
  [donateModal, contactModal, servicesModal].forEach((modal) => toggleModal(modal, false));
});
