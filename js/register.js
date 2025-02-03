import { getTokenFromCookies } from "./cookies.js";

const token = getTokenFromCookies();
if (token) {
  window.location.href = "/index.html";
}

const validation = new JustValidate("#registerForm");

validation
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Name is required",
    },
  ])
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "Email is required",
    },
    {
      rule: "email",
      errorMessage: "Email is not valid",
    },
  ])
  .addField("#password", [
    {
      rule: "required",
      errorMessage: "Password is required",
    },
    {
      rule: "minLength",
      value: 6,
      errorMessage: "Password must be at least 6 characters",
    },
  ])
  .addField("#confirmPassword", [
    {
      rule: "required",
      errorMessage: "Confirm Password is required",
    },
    {
      validator: (value, fields) => {
        return value === fields["#password"].elem.value;
      },
      errorMessage: "Passwords do not match",
    },
  ])
  .onSuccess((e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      password_confirmation: document.getElementById("confirmPassword").value,
    };

    axios
      .post("https://api.gosorsolutions.com/api/register", formData)
      .then((res) => {
        Cookies.set("token", res.data.data.token, { expires: 7 });
        localStorage.setItem("userName", JSON.stringify(res.data.data.user));    
      })
      .catch((error) => {
        console.error(error);
      });
  });
