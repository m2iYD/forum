import { Question } from "../models/Question.js";
import { Theme } from "../models/Theme.js";
import { Auth } from "../models/Auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  Auth.checkAuthentication();

  const allQuestions = await Question.findAll();
  const allThemes = await Theme.findAll();

  const questionsList = document.getElementById("questions-list");
  const themeContainer = document.getElementById("theme");

  try {
    if (!Array.isArray(allThemes)) {
      throw new Error("Données reçues invalides");
    }
    displayThemes(allThemes);
  } catch (error) {
    themeContainer.innerHTML = `<option value="">${error.message}</option>`;
  }

  try {
    if (!Array.isArray(allQuestions)) {
      throw new Error("Données reçues invalides");
    }
    displayQuestions(allQuestions);
  } catch (error) {
    questionsList.innerHTML = `<p>Erreur de chargement des questions : ${error.message}</p>`;
  }

  themeContainer.addEventListener("change", async (event) => {
    displayQuestions(allQuestions, event.target.value);
  });
});

function displayQuestions(questions, theme = "all") {
  const questionContainer = document.getElementById("questions-list");
  if (theme !== "all") {
    questions = questions.filter((q) => q.theme.name === theme);
  }

  let html = "";
  questions.forEach((question) => {
    html += `
      <a href="detail.html?id=${question.id_question}" class="question-card">
        <div class="question-header">
          <span class="author">${
            question.author.lastname + " " + question.author.firstname
          }</span>
          <span class="date">${new Date(question.updated_at).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}</span>
        </div>
        <p class="content">${question.content}</p>
        <div class="question-footer">
          <span class="responses">Responses: ${question.answers.length}</span>
          <span class="theme">${question.theme.name}</span>
        </div>
      </a>

      `;
  });
  questionContainer.innerHTML = html;
}

function displayThemes(themes) {
  const themeContainer = document.getElementById("theme");
  let html = `<option value="all">Choose Theme</option>`;

  themes.forEach((theme) => {
    html += `<option value="${theme.name}">${theme.name}</option>`;
  });
  themeContainer.innerHTML = html;
}
