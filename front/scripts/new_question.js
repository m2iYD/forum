document.addEventListener("DOMContentLoaded", () => {
    const newPostForm = document.getElementById("newQuestionForm");
    const themeSelect = document.getElementById("theme");
    

    
    
    newPostForm.addEventListener("submit", async function(e) {
      e.preventDefault();
  
      // Récupérer les valeurs du formulaire
      const content = document.getElementById("content").value;
      const thme_id = document.getElementById("theme").value;
  
      // Récupérer le token et l'ID utilisateur depuis le localStorage
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");

  
      if (!token) {
        alert("You must be logged in to post.");
        window.location.href = "login.html";
        return;
      }
      if (!user_id) {
        alert("Unable to retrieve your user ID. Please log in again.");
        window.location.href = "login.html";
        return;
      }
  
      // Préparer les données du post
      const postData = { content, user_id, theme_id };
  
      try {
        const response = await fetch("http://localhost:8001/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify(postData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error when creating the question");
        }
  
        alert("Question créé avec succès !");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Error when creating the post:", error);
      }
    });
  });
  