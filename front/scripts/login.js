document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginData = { email, password };

  fetch("http://localhost:8001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Identifiants invalides");
      }

      // Récupérer le header Authorization
      const authHeader = response.headers.get("Authorization");
      console.log(authHeader);
      // alert(authHeader);

      if (!authHeader) {
        throw new Error("Access token non trouvé dans les headers");
      }

      // Extraire uniquement le token (sans "Bearer ")
      const accessToken = authHeader.split(" ")[1];

      console.log("Access Token:", accessToken);
      // alert("Access Token: " + accessToken);

      // Stocker le token et rediriger
      localStorage.setItem("access_token", accessToken);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erreur:", error);
      // alert("Erreur lors de la connexion.");
    });
});
