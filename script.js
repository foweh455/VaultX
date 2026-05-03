const form = document.querySelector(".access-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector(".form-message");
const faqButtons = document.querySelectorAll(".faq-question");

function closeFaq(button) {
  const answer = button.nextElementSibling;
  button.setAttribute("aria-expanded", "false");
  answer.style.maxHeight = null;
}

function openFaq(button) {
  const answer = button.nextElementSibling;
  button.setAttribute("aria-expanded", "true");
  answer.style.maxHeight = `${answer.scrollHeight}px`;
}

faqButtons.forEach(button => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    faqButtons.forEach(closeFaq);

    if (!isOpen) {
      openFaq(button);
    }
  });
});

window.addEventListener("resize", () => {
  faqButtons.forEach(button => {
    if (button.getAttribute("aria-expanded") === "true") {
      const answer = button.nextElementSibling;
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!emailInput.checkValidity()) {
    formMessage.textContent = "Enter a valid work email to join the early access list.";
    emailInput.focus();
    return;
  }

  formMessage.textContent = "You're on the list. We'll send a concise note soon.";
  form.reset();
});
