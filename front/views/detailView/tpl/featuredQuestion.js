export function renderFeaturedQuestion(question) {
  return `
        <div class="card-header">
            <span class="author">${question.author.lastname} ${question.author.firstname}</span>
            <span class="date">${new Date(question.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                })}
            </span>
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
