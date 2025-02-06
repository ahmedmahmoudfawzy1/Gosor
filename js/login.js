const validation = new JustValidate("#loginForm");

validation
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
  .onSuccess((e) => {
    e.preventDefault();
    const dataLoginForm = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    axios
      .post("https://api.gosorsolutions.com/api/login", dataLoginForm)
      .then((res) => {
        Cookies.set("token", res.data.data.token);
        const token = Cookies.get("token");
        token
          ? (window.location.href = "index.html")
          : (window.location.href = "login.html");

        localStorage.setItem("userName", JSON.stringify(res.data.data.user));
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  });
