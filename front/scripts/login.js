document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      const response = await fetch("http://localhost:8001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const accessToken = response.headers.get("Authorization")?.split(" ")[1]; // Extraction du token
      const data = await response.json();

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", data.id_author);

      window.location.href = "index.html";
    } catch (error) {
      console.error("Error:", error);
    }
  });

document.getElementById("gohome").addEventListener("click", () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    window.location.href = "index.html";
  }
});
