import { Question } from "../models/Question.js";

document.addEventListener("DOMContentLoaded", async () => {
  const questionContainer = document.getElementById("quest");

  // 1️⃣ Récupérer l'ID de la question dans l'URL
  const params = new URLSearchParams(window.location.search);
  const questionId = params.get("id");

  if (!questionId) {
    console.error("No question ID found in URL");
    window.location.href = "index.html";
    return;
  }

  try {
    // 2️⃣ Récupérer les données de la question via API
    const question = await Question.findById(questionId);

    if (!question) {
      console.error("Question not found");
      questionContainer.innerHTML = `<p>Erreur de chargement des questions</p>`;
      return;
    }

    // 3️⃣ Afficher la question dans le DOM
    displayQuestion(question);
    displayAnswers(question.answers);
  } catch (error) {
    console.error("Error fetching question:", error);
    questionContainer.innerHTML = `<p>Erreur de chargement des questions : ${error.message}</p>`;
  }
});

// Fonction pour afficher la question sur la page
function displayQuestion(question) {
  const questionContainer = document.getElementById("quest");
  questionContainer.innerHTML = `
      <div class="card-header">
        <span class="author">${question.author.lastname} ${
    question.author.firstname
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
      <div class="card-body">
        <p class="question-title">${question.content}</p>
      </div>
      <div class="card-footer">
        <span class="responses">${question.answers.length} responses</span>
        <span class="theme">${question.theme.name}</span>
      </div>
  `;
}

// Fonction pour afficher les réponses
function displayAnswers(answers) {
  const answersList = document.getElementById("answers-list");

  if (answers.length === 0) {
    answersList.innerHTML = `<p>Empty</p>`;
    return;
  }

  let html = "";
  answers.forEach((answer) => {
    html += `
    <li class="answer">
      <article class="answer-card">
        <div class="answer-header">
          <span class="author">${answer.author.lastname} ${
      answer.author.firstname
    }</span>
          <span class="date">${new Date(answer.updated_at).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}</span>
        </div>
        <div class="answer-body">
          <p>${answer.content}</p>
        </div>
        <div class="answer-footer">
          <span class="responses">${answer.nb_like} likes</span>
          <span class="theme">${answer.nb_dislike} dislikes</span>
        </div>
      </article>
      </li>
    `;
  });

  answersList.innerHTML = html;
}
