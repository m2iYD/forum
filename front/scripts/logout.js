document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Effacer le token et autres données d'authentification stockées
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        // Rediriger vers la page de connexion
        window.location.href = "login.html";
      });
    }
  });
  