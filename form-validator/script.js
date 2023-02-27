/* eslint-disable no-restricted-syntax */
const signupForm = document.getElementById("signup-form");
const signupBtn = document.getElementById("signup-btn");

function validate(formControls) {
  function toggleClasses(e, addClass, removeClass) {
    e.classList.add(addClass);
    e.classList.remove(removeClass);
  }

  function setErrorMessage(e, msg) {
    e.textContent = msg;
  }

  function validateUserName(username) {
    const { value } = username.input;
    if (value.length < 3) {
      setErrorMessage(username.msg, "Username must be at least 3 characters");
      toggleClasses(username.div, "error", "success");
    } else {
      toggleClasses(username.div, "success", "error");
    }
  }

  function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = email.input;
    if (!emailRegex.test(value)) {
      setErrorMessage(email.msg, "Email is not valid");
      toggleClasses(email.div, "error", "success");
    } else {
      toggleClasses(email.div, "success", "error");
    }
  }

  function validatePassword(password, passwordConfirm) {
    const pv = password.input.value;
    const pcv = passwordConfirm.input.value;
    if (pv.length < 6) {
      toggleClasses(password.div, "error", "success");
      setErrorMessage(password.msg, "Password must be at least 6 characters");
    } else {
      toggleClasses(password.div, "success", "error");
    }
    if (!pcv && !pv) {
      toggleClasses(passwordConfirm.div, "error", "success");
      setErrorMessage(passwordConfirm.msg, "Password2 is required");
    } else if (pv !== pcv) {
      toggleClasses(passwordConfirm.div, "error", "success");
      setErrorMessage(passwordConfirm.msg, "Passwords do not match");
    } else {
      toggleClasses(passwordConfirm.div, "success", "error");
    }
  }

  for (const [key, value] of formControls) {
    if (key === "username") validateUserName(value);
    else if (key === "email") checkEmail(value);
    else if (key === "password")
      validatePassword(value, formControls.get("passwordConfirm"));
  }
}

signupBtn.addEventListener("click", e => {
  e.preventDefault();
  const formControls = new Map();
  for (const div of signupForm.children) {
    if (div.classList.contains("form-control")) {
      const input = div.querySelector("input");
      const msg = div.querySelector("small");
      formControls.set(input.id, { div, input, msg });
    }
  }
  validate(formControls);
});
