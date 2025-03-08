import { Question } from "../models/Question.js";
import { Theme } from "../models/Theme.js";
import { Auth } from "../models/Auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  Auth.checkAuthentication();

  const allQuestions = await Question.findAll();
  const allThemes = await Theme.findAll();

  const questionsList = document.getElementById("questions-list");
  const themeContainer = document.getElementById("theme");
  const sortByPopularityButton = document.getElementById("sort-by-popularity");

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

  sortByPopularityButton.addEventListener("click", () => {
    sortByPopularity(allQuestions);
  });
});

function displayQuestions(questions, theme = "all", sortBy = "date") {
  // Added sortBy parameter
  const questionContainer = document.getElementById("questions-list");
  let filteredQuestions = questions;

  if (theme !== "all") {
    filteredQuestions = questions.filter((q) => q.theme.name === theme);
  }

  if (sortBy === "date") {
    filteredQuestions.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sortBy === "popularity") {
    filteredQuestions.sort((a, b) => b.answers.length - a.answers.length);
  }

  if (filteredQuestions.length === 0) {
    questionContainer.innerHTML = `<div class="question-card empty-card">
    <div class="question-header">
        <span class="author"></span>
        <span class="date"></span>
    </div>
    <p class="content">Aucune question disponible pour le moment.</p>
    <div class="question-footer">
        <span class="responses"></span>
        <span class="theme"></span>
    </div>
</div>`;
    return;
  }

  let html = "";
  filteredQuestions.forEach((question) => {
    html += `
            <a href="detail.html?id=${
              question.id_question
            }" class="question-card">
                <div class="question-header">
                    <span class="author">${
                      question.author.lastname + " " + question.author.firstname
                    }</span>
                    <span class="date">${new Date(
                      question.updated_at
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                </div>
                <p class="content">${question.content}</p>
                <div class="question-footer">
                    <span class="responses">Responses: ${
                      question.answers.length
                    }</span>
                    <span class="theme">${question.theme.name}</span>
                </div>
            </a>
        `;
  });
  questionContainer.innerHTML = html;
}

function displayThemes(themes) {
  const themeContainer = document.getElementById("theme");
  let html = `<option value="all">All themes</option>`;

  themes.forEach((theme) => {
    html += `<option value="${theme.name}">${theme.name}</option>`;
  });
  themeContainer.innerHTML = html;
}

function sortByPopularity(questions) {
  const theme = document.getElementById("theme").value;
  let filteredQuestions = questions;

  if (theme !== "all") {
    filteredQuestions = questions.filter((q) => q.theme.name === theme);
  }

  displayQuestions(filteredQuestions, theme, "popularity"); // Call displayQuestions with sortBy parameter
}
