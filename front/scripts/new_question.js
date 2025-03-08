import { Theme } from "../models/Theme.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("newQuestionForm");
  const themeDropdown = document.getElementById("theme");

  // Fonction pour afficher les thèmes dans le select
  const displayThemes = (themes) => {
    themeDropdown.innerHTML = "";
    themes.forEach((theme) => {
      const option = document.createElement("option");
      option.value = theme.id_theme;
      option.textContent = theme.name;
      themeDropdown.appendChild(option);
    });
  };

  // Récupérer et afficher les thèmes au chargement de la page
  try {
    const themes = await Theme.findAll();

    if (!Array.isArray(themes)) {
      throw new Error("Invalid data received");
    }
    displayThemes(themes);
  } catch (error) {
    themeDropdown.innerHTML = `<option value="">Error: ${error.message}</option>`;
  }

  // Écouteur d'événement pour la soumission du formulaire
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const content = document.getElementById("content").value;
    const themeId = themeDropdown.value;

    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id").toString();

    if (!token || !userId) {
      alert("You must be logged in to post.");
      window.location.href = "login.html";
      return;
    }

    const questionData = {
      content: content,
      author_id: userId,
      theme_id: themeId,
    };

    try {
      const response = await fetch("http://localhost:8001/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error creating the question");
      }

      alert("Question created successfully!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error creating the question:", error);
    }
  });
});
