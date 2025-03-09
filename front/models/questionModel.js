export class Question {
  constructor(
    id_question,
    content,
    author,
    theme,
    created_at,
    updated_at,
    answers
  ) {
    this.apiUrl = "http://localhost:8001/api/questions";
    this.id_question = id_question;
    this.content = content;
    this.author = author;
    this.theme = theme;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.answers = answers;
  }

  async findAll() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(this.apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch questions");
    const data = await response.json();
    return data.map(
      (q) =>
        new Question(
          q.id_question,
          q.content,
          q.author,
          q.theme,
          q.created_at,
          q.updated_at,
          q.answers || []
        )
    );
  }
}
