document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();

      // Vérifier la présence du token avant suppression
      console.log(
        "Avant suppression, token:",
        localStorage.getItem("access_token")
      );

      // Supprimer le token et les données utilisateur
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      sessionStorage.clear(); // Supprime toute session active
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Vérifier après suppression
      console.log(
        "Après suppression, token:",
        localStorage.getItem("access_token")
      );

      // Forcer le rechargement complet après redirection
      window.location.href = "login.html";

      setTimeout(() => {
        location.reload(true); // Recharge la page en forçant un refresh
      }, 100);
    });
  }
});
