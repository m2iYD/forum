document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = { firstname, lastname, email, password };

    fetch("http://localhost:8001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }

        if (response.status == 201) {
          alert("Inscription réussi connectez-vous !");
          window.location.href = "login.html";
        } else {
          throw new Error("Erreur lors de l'inscription");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de l'inscription.");
        window.location.href = "register.html";
      });
  });
