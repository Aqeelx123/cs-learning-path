const form = document.getElementById("login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const button = document.querySelector("#submit");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if(email === "" || password === "")
  {
    errorMessage.innerText("All fields are required...Please fill them out");
    return;
  }

  if(!email.includes("@"))
  {
    errorMessage.innerText("Please enter a valid email address");
  }

  form.submit();
});
