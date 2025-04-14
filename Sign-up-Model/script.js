/* const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");

signInBtn.addEventListener("click", () => {
  signInForm.classList.add("active");
  signUpForm.classList.remove("active");
  signInBtn.classList.add("active");
  signUpBtn.classList.remove("active");
});

signUpBtn.addEventListener("click", () => {
  signUpForm.classList.add("active");
  signInForm.classList.remove("active");
  signUpBtn.classList.add("active");
  signInBtn.classList.remove("active");
});

// Kayıt olma işlemi
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = signUpForm.querySelector("input[type='text']").value;
  const email = signUpForm.querySelector("input[type='email']").value;
  const password = signUpForm.querySelector("input[type='password']").value;

  const user = {
    username,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Registration successful! You can now log in.");
  signInBtn.click();
});

// Giriş yapma işlemi
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm.querySelector("input[type='email']").value;
  const password = signInForm.querySelector("input[type='password']").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No user found. Please register first.");
    return;
  }

  if (savedUser.email === email && savedUser.password === password) {
    alert(`Welcome back, ${savedUser.username}!`);
  } else {
    alert("Invalid email or password.");
  }
}); */

const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");

signInBtn.addEventListener("click", () => {
  signInForm.classList.add("active");
  signUpForm.classList.remove("active");
  signInBtn.classList.add("active");
  signUpBtn.classList.remove("active");
});

signUpBtn.addEventListener("click", () => {
  signUpForm.classList.add("active");
  signInForm.classList.remove("active");
  signUpBtn.classList.add("active");
  signInBtn.classList.remove("active");
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = signUpForm.querySelector("input[type='text']").value;
  const email = signUpForm.querySelector("input[type='email']").value;
  const password = signUpForm.querySelector("input[type='password']").value;

  const user = {
    username,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Registration successful! You can now log in.");
  signInBtn.click();
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm.querySelector("input[type='email']").value;
  const password = signInForm.querySelector("input[type='password']").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No user found. Please register first.");
    return;
  }

  if (savedUser.email === email && savedUser.password === password) {
    alert(`Welcome back, ${savedUser.username}!`);
  } else {
    alert("Invalid email or password.");
  }
});
