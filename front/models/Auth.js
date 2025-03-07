// auth.js
export class Auth {
  constructor() {}

  // Fonction pour vérifier si l'utilisateur est authentifié
  static checkAuthentication() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.redirectToLogin();
      return false;
    }

    return this.verifyToken(token);
  }

  // Fonction pour vérifier un token auprès de l'API
  static verifyToken(token) {
    return fetch("http://localhost:8001/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          this.redirectToLogin();
          throw new Error("Not authenticated");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Utilisateur authentifié :", data);
        localStorage.setItem("user_id", data.id_author); // Sauvegarde l'id de l'utilisateur dans le localStorage
        return true;
      })
      .catch((error) => {
        console.error("Erreur d'authentification :", error);
        // this.redirectToLogin();
        return false;
      });
  }

  // Fonction pour rediriger vers la page de login
  static redirectToLogin() {
    window.location.href = "login.html";
  }

  // Fonction statique pour mettre à jour le mot de passe
  static async updatePassword(oldPassword, newPassword) {
    const token = localStorage.getItem("access_token");

    // Envoi de la requête PUT pour mettre à jour le mot de passe
    fetch("http://localhost:8001/api/auth/update-password", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update password.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Password updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating password:", error);
      });
  }
}
