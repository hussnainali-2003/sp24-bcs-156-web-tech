const emailInput = document.querySelector("#email");
const emailMessage = document.querySelector("#email-message");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (!email) {
    emailMessage.textContent = "";
    emailMessage.className = "result";
  } else if (emailPattern.test(email)) {
    emailMessage.textContent = "✓ Valid email address";
    emailMessage.className = "result valid";
  } else {
    emailMessage.textContent = "✕ Please enter a valid email address";
    emailMessage.className = "result invalid";
  }
});
