export function renderFeaturedAnswers(answers) {
  if (answers.length === 0) {
    return `<option value="loading">Loading answers...</option>`;
  }

  return answers
    .map(
      (answer) =>
        `<option value="${answer.id_answer}">${answer.content}</option>`
    )
    .join();
}
