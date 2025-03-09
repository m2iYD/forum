/**
 * Template pour les questions à la une
 * @param {Array} questions - Liste des questions à afficher
 * @returns {string} HTML des questions à la une
 */
export function renderFeaturedQuestions(questions) {
  if (questions.length === 0) {
    return `<div class="question-card empty-card">
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
  }

  return questions
    .map(
      (question) => `
            <a href="/questions/${
              question.id_question
            }" class="question-card" data-link>
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
        `
    )
    .join("");
}
