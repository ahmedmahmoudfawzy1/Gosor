const userInfo = JSON.parse(localStorage.getItem("userName"));
const userName = document.querySelector(".task_header");
if (!userInfo) {
  userName.textContent = `Good Morning, "User Name" 👋 `;
} else {
  const accountCreated = document.querySelector(".date");
  accountCreated.textContent = `${userInfo.created_at.slice(0, 10)}`;
  userName.textContent = `Good Morning, ${userInfo.name || "User Name"} 👋 `;
}
