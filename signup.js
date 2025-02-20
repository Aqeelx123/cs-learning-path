document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();

      // Validate Name
      if (name === "") {
          alert("Full Name cannot be empty.");
          return;
      }

      // Validate Email
      if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          return;
      }

      // Validate Password Strength
      if (!validatePassword(password)) {
          alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
          return;
      }

      // Confirm Password Match
      if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
      }

      // If all validations pass
      alert("Account created successfully!");
      form.reset(); // Reset form after successful validation
  });

  // Email Validation Function
  function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  // Password Strength Validation Function
  function validatePassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
  }
});
