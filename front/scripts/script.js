document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("access_token");

  fetch("http://localhost:8001/api/questions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("Données reçues invalides");
      }
      displayQuestions(data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des questions:", error);

      const questionsList = document.getElementById("questions-list");
      if (questionsList) {
        questionsList.innerHTML = `<p>Erreur de chargement des questions : ${error.message}</p>`;
      }
    });
});

function displayQuestions(questions) {
  const questionContainer = document.getElementById("questions-list");
  let html = "";
  questions.forEach((question) => {
    html += `
        <div class="question-card">
  <h2>
    <a href="detail.html?${question.id_question}">${question.content}</a>
  </h2>
  <p><strong>Theme:</strong> <span class="theme">${
    question.theme.name
  }</span></p>
  <p><strong>Author:</strong> <span class="author">${
    question.author.firstname
  } ${question.author.lastname}</span></p>
  <p><strong>Email:</strong> <span class="email">${
    question.author.email
  }</span></p>
  <p>
    <strong>Created on:</strong> 
    <span class="date">
      ${new Date(question.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  </p>
  <p>
    <strong>Updated on:</strong> 
    <span class="date">
      ${new Date(question.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  </p>
  <p><strong>Responses:</strong> <span class="responses">${
    question.answers.length
  }</span></p>
</div>

      `;
  });
  questionContainer.innerHTML = html;
}
