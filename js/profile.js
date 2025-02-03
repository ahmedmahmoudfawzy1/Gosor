import { getTokenFromCookies } from "./cookies.js";

const token = getTokenFromCookies();
if (token === undefined) {
  window.location.href = "/register.html";
}

const userInfo = JSON.parse(localStorage.getItem("userName"));

console.log(userInfo);

const nameInput = document.querySelector(".profile-input-name");
const emailInput = document.querySelector(".profile-input-email");

nameInput.value = userInfo.name;
emailInput.value = userInfo.email;
