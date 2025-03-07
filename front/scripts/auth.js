document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("access_token");
  alert("TOKEN: " + token);
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch("http://localhost:8001/api/auth/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        window.location.href = "login.html";
        throw new Error("Not authenticated");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Utilisateur authentifié :", data);

      localStorage.setItem("user_id", data.id);
    })
    .catch((error) => {
      console.error("Erreur d'authentification :", error);
      window.location.href = "login.html";
    });
});
