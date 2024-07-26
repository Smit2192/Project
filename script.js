document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.getElementById("form-container");
  const homeContainer = document.getElementById("home-container");
  const formTitle = document.getElementById("form-title");
  const formDescription = document.getElementById("form-description");
  const repeatPasswordLabel = document.getElementById("repeat-password-label");
  const repeatPasswordInput = document.getElementById("psw-repeat");
  const submitBtn = document.getElementById("submit-btn");
  const toggleFormLink = document.getElementById("toggle-form");
  const terms = document.getElementById("terms");
  const storageLabel = document.getElementById("storage-label");
  const storageSelect = document.getElementById("storage");
  const userNameSpan = document.getElementById("user-name");
  const userEmailSpan = document.getElementById("user-email");
  const logoutBtn = document.getElementById("logout-btn");

  let isRegister = true;

  toggleFormLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleForm();
  });

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    handleFormSubmit();
  });

  logoutBtn.addEventListener("click", function () {
    logout();
  });

  function toggleForm() {
    if (isRegister) {
      formTitle.textContent = "Login";
      formDescription.textContent = "Please fill in this form to login.";
      repeatPasswordLabel.style.display = "none";
      repeatPasswordInput.style.display = "none";
      storageLabel.style.display = "none";
      storageSelect.style.display = "none";
      terms.style.display = "none";
      submitBtn.textContent = "Login";
      toggleFormLink.textContent = "Register";
      isRegister = false;
    } else {
      formTitle.textContent = "Register";
      formDescription.textContent =
        "Please fill in this form to create an account.";
      repeatPasswordLabel.style.display = "block";
      repeatPasswordInput.style.display = "block";
      storageLabel.style.display = "block";
      storageSelect.style.display = "block";
      terms.style.display = "block";
      submitBtn.textContent = "Register";
      toggleFormLink.textContent = "Sign in";
      isRegister = true;
    }
  }

  function handleFormSubmit() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;
    const storageType = document.getElementById("storage").value;

    if (!email || !password) {
      alert("Please fill in both email and password!");
      return;
    }

    if (isRegister) {
      const repeatPassword = document.getElementById("psw-repeat").value;
      if (!repeatPassword) {
        alert("Please repeat the password!");
        return;
      }
      if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
      }

      let storedEmail;
      switch (storageType) {
        case "localStorage":
          storedEmail = localStorage.getItem("email");
          break;
        case "cookies":
          storedEmail = getCookie("email");
          break;
        case "sessionStorage":
          storedEmail = sessionStorage.getItem("email");
          break;
      }

      if (storedEmail === email) {
        alert("Email is already registered!");
        return;
      }

      switch (storageType) {
        case "localStorage":
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          break;
        case "cookies":
          document.cookie = `email=${email}; path=/`;
          document.cookie = `password=${password}; path=/`;
          break;
        case "sessionStorage":
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("password", password);
          break;
      }

      alert("Registered successfully!");
      clearInputs();
      toggleForm();
    } else {
      let storedEmail, storedPassword;
      switch (storageType) {
        case "localStorage":
          storedEmail = localStorage.getItem("email");
          storedPassword = localStorage.getItem("password");
          break;
        case "cookies":
          storedEmail = getCookie("email");
          storedPassword = getCookie("password");
          break;
        case "sessionStorage":
          storedEmail = sessionStorage.getItem("email");
          storedPassword = sessionStorage.getItem("password");
          break;
      }

      if (email === storedEmail && password === storedPassword) {
        homeContainer.style.display = "block";
        formContainer.style.display = "none";
        userNameSpan.textContent = email.split("@")[0];
        userEmailSpan.textContent = email;
      } else {
        alert("Invalid login credentials!");
      }
      clearInputs();
    }
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function logout() {
    formContainer.style.display = "block";
    homeContainer.style.display = "none";
    formTitle.textContent = "Login";
    formDescription.textContent = "Please fill in this form to login.";
    repeatPasswordLabel.style.display = "none";
    repeatPasswordInput.style.display = "none";
    storageLabel.style.display = "none";
    storageSelect.style.display = "none";
    terms.style.display = "none";
    submitBtn.textContent = "Login";
    toggleFormLink.textContent = "Register";
    isRegister = false;
    clearInputs();
  }

  function clearInputs() {
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
    document.getElementById("psw-repeat").value = "";
    document.getElementById("storage").value = "localStorage";
  }
});
