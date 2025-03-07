import { Answer } from "../models/Answer.js";
import { Question } from "../models/Question.js";
import { Theme } from "../models/Theme.js";
import { Auth } from "../models/Auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1️⃣ Récupérer l'ID de la question dans l'URL
  const params = new URLSearchParams(window.location.search);
  const questionId = params.get("id");

  if (!questionId) {
    console.error("No question ID found in URL");
    return;
  }

  try {
    // 2️⃣ Récupérer les données de la question via API
    const question = await Question.findById(questionId);

    if (!question) {
      console.error("Question not found");
      return;
    }

    // 3️⃣ Afficher la question dans le DOM
    displayQuestion(question);
  } catch (error) {
    console.error("Error fetching question:", error);
  }
});

// Fonction pour afficher la question sur la page
function displayQuestion(question) {
  const questionContainer = document.getElementById("question-container");

  if (!questionContainer) return;

  questionContainer.innerHTML = `
    <div class="question-card">
      <a href="detail.html?id=${question.id_question}" class="question-link">
        <div class="question-header">
          <span class="author">${question.author.firstname} ${
    question.author.lastname
  }</span>
          <span class="date">${new Date(
            question.created_at
          ).toLocaleDateString()}</span>
        </div>
        <p class="question-content">${question.content}</p>
        <div class="question-footer">
          <span class="responses">${question.answers.length} Responses</span>
          <span class="theme">${question.theme_id}</span>
        </div>
      </a>
    </div>
  `;
}
