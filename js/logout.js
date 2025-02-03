import { getTokenFromCookies } from "./cookies.js";

const token = getTokenFromCookies();
if (token === undefined) {
  window.location.href = "/register.html";
}

const logOutBtn = document.querySelector(".logout-btn");

logOutBtn.addEventListener("click", () => {
  Cookies.remove("token");
  localStorage.removeItem("userName");
  window.location.href = "/register.html";
});
