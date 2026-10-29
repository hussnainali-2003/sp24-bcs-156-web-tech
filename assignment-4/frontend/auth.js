const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isRegister = form.id === "register-form";
  const body = isRegister ? { name: document.querySelector("#name").value, email: document.querySelector("#email").value, password: document.querySelector("#password").value } : { email: document.querySelector("#email").value, password: document.querySelector("#password").value };
  const message = document.querySelector("#message");
  try { const response = await fetch(`/api/auth/${isRegister ? "register" : "login"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); localStorage.setItem("assignment4-token", data.token); message.textContent = "Success. Redirecting..."; window.location.href = "index.html"; } catch (error) { message.textContent = error.message; }
});
