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

function setupAnonymousToggle({ checkbox, container, fields, requiredFields = [] }) {
  if (!checkbox) return;

  const update = () => {
    const anonymous = checkbox.checked;
    if (container) {
      container.style.opacity = anonymous ? "0.45" : "1";
      container.style.pointerEvents = anonymous ? "none" : "auto";
    }

    fields.forEach((field) => {
      if (!field) return;
      field.disabled = anonymous;
      if (anonymous) {
        field.dataset.cachedValue = field.value;
        field.value = "";
      } else if (field.dataset.cachedValue !== undefined) {
        field.value = field.dataset.cachedValue;
        delete field.dataset.cachedValue;
      }
    });

    requiredFields.forEach((field) => {
      if (field) field.required = !anonymous;
    });
  };

  checkbox.addEventListener("change", update);
  update();
}

const helpModal = wireModal("help-modal", "close-help-modal");
const donateModal = wireModal("donate-modal", "close-donate-modal");
const ideaModal = wireModal("idea-modal", "close-idea-modal");
const suggestionModal = wireModal("suggestion-modal", "close-suggestion-modal");
const contactModal = wireModal("contact-modal", "close-contact-modal");
const servicesModal = wireModal("services-modal", "close-services-modal");

const helpButton = document.getElementById("help-us-btn");
if (helpButton) {
  helpButton.addEventListener("click", () => toggleModal(helpModal, true));
}

const contactButton = document.getElementById("nav-cta-btn");
if (contactButton) {
  contactButton.addEventListener("click", () => toggleModal(contactModal, true));
}

const contactServicesLink = document.getElementById("contact-services-link");
if (contactServicesLink) {
  contactServicesLink.addEventListener("click", () => toggleModal(contactModal, false));
}

const viewServicesButton = document.getElementById("view-services-btn");
if (viewServicesButton) {
  viewServicesButton.addEventListener("click", () => toggleModal(servicesModal, true));
}

document.querySelectorAll("[data-help-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.helpAction;
    toggleModal(helpModal, false);
    if (action === "donate") toggleModal(donateModal, true);
    if (action === "idea") toggleModal(ideaModal, true);
    if (action === "suggestion") toggleModal(suggestionModal, true);
  });
});

const ideaForm = document.getElementById("idea-form");
const ideaAnonToggle = document.getElementById("idea-anon");
const ideaIdentityFields = document.getElementById("idea-identity-fields");
const ideaNameInput = ideaForm ? ideaForm.querySelector('input[name="name"]') : null;
const ideaEmailInput = ideaForm ? ideaForm.querySelector('input[name="email"]') : null;

setupAnonymousToggle({
  checkbox: ideaAnonToggle,
  container: ideaIdentityFields,
  fields: [ideaNameInput, ideaEmailInput],
  requiredFields: [ideaNameInput, ideaEmailInput]
});

if (ideaForm) {
  ideaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(ideaForm);
    const anonymous = ideaAnonToggle ? ideaAnonToggle.checked : false;
    const message = [
      "New Idea Submission",
      anonymous ? "Submitted anonymously: Yes" : null,
      !anonymous && formData.get("name") ? `Name: ${formData.get("name")}` : null,
      !anonymous && formData.get("email") ? `Email: ${formData.get("email")}` : null,
      formData.get("idea_title") ? `Title: ${formData.get("idea_title")}` : null,
      formData.get("idea_details") ? `Idea: ${formData.get("idea_details")}` : null
    ].filter(Boolean).join("\n");

    openWhatsApp(message);
    showToast("Opening WhatsApp to send your idea.");
    ideaForm.reset();
    if (ideaAnonToggle) ideaAnonToggle.dispatchEvent(new Event("change"));
    toggleModal(ideaModal, false);
  });
}

const suggestionForm = document.getElementById("suggestion-form");
const suggestionAnonToggle = document.getElementById("suggestion-anon");
const suggestionIdentityFields = document.getElementById("suggestion-identity-fields");
const suggestionNameInput = suggestionForm ? suggestionForm.querySelector('input[name="name"]') : null;
const suggestionEmailInput = suggestionForm ? suggestionForm.querySelector('input[name="email"]') : null;

setupAnonymousToggle({
  checkbox: suggestionAnonToggle,
  container: suggestionIdentityFields,
  fields: [suggestionNameInput, suggestionEmailInput]
});

if (suggestionForm) {
  suggestionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(suggestionForm);
    const anonymous = suggestionAnonToggle ? suggestionAnonToggle.checked : false;
    const message = [
      "New Suggestion",
      anonymous ? "Submitted anonymously: Yes" : null,
      !anonymous && formData.get("name") ? `Name: ${formData.get("name")}` : null,
      !anonymous && formData.get("email") ? `Email: ${formData.get("email")}` : null,
      formData.get("suggestion") ? `Suggestion: ${formData.get("suggestion")}` : null
    ].filter(Boolean).join("\n");

    openWhatsApp(message);
    showToast("Opening WhatsApp to send your suggestion.");
    suggestionForm.reset();
    if (suggestionAnonToggle) suggestionAnonToggle.dispatchEvent(new Event("change"));
    toggleModal(suggestionModal, false);
  });
}

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
  [helpModal, donateModal, ideaModal, suggestionModal, contactModal, servicesModal].forEach((modal) => toggleModal(modal, false));
});
