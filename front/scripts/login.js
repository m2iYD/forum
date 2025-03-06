
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  const loginData = { email, password };


  fetch("http://localhost:8001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Identifiants invalides");
    }
    return response.json();
  })
  .then(data => {
    // Stocker le token dans le localStorage
    console.log(data.access_token)
    localStorage.setItem("access_token", data.access_token);
    alert("Connexion réussie !");
    // window.location.href = "index.html";
  })
  .catch(error => {
    console.error("Erreur:", error);
    alert("Erreur lors de la connexion.");
  });
});
