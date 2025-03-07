document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  if (!token || !userId) {
    // Rediriger vers la page de connexion si le token ou l'ID utilisateur n'est pas présent
    window.location.href = "login.html";
    return;
  }

  // Récupérer l'email de l'utilisateur
  fetch(`http://localhost:8001/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("email").value = data.email;
    })
    .catch((error) => {
      console.error("Error fetching user email:", error);
    });

  document
    .getElementById("profileForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (newPassword !== confirmPassword) {
        alert("Les nouveaux mots de passe ne correspondent pas.");
        return;
      }

      const updateData = {
        old_password: currentPassword,
        new_password: newPassword,
      };

      try {
        const response = await fetch(
          `http://localhost:8001/api/auth/update-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            alert("Mot de passe actuel incorrect.");
          } else {
            throw new Error("Failed to update password");
          }
          return;
        }

        alert("Mot de passe mis à jour avec succès!");
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
      } catch (error) {
        console.error("Error updating password:", error);
        alert(
          "Une erreur s'est produite lors de la mise à jour du mot de passe."
        );
      }
    });

  document.getElementById("gohome").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
