export class Question {
  constructor(
    id_question,
    content,
    user_id,
    theme_id,
    created_at,
    updated_at,
    answers = []
  ) {
    this.id_question = id_question;
    this.content = content;
    this.user_id = user_id;
    this.theme_id = theme_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.answers = answers;
  }

  // 🔹 Récupérer toutes les questions via API
  static async findAll() {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch("http://localhost:8001/api/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch questions");
      const questions = await response.json();
      return questions.map(
        (q) =>
          new Question(
            q.id_question,
            q.content,
            q.user_id,
            q.theme_id,
            q.created_at,
            q.updated_at,
            q.answers || []
          )
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  }

  // 🔹 Trouver une question par ID via API
  static async findById(id) {
    try {
      const response = await fetch(`http://localhost:8001/api/questions/${id}`);
      if (!response.ok) throw new Error("Question not found");
      const q = await response.json();
      return new Question(
        q.id_question,
        q.content,
        q.user_id,
        q.theme_id,
        q.created_at,
        q.updated_at,
        q.answers || []
      );
    } catch (error) {
      console.error(`Error fetching question with ID ${id}:`, error);
      return null;
    }
  }

  // 🔹 Récupérer les réponses associées à une question
  static async getAnswers(id) {
    try {
      const response = await fetch(
        `http://localhost:8001/api/questions/${id}/answers`
      );
      if (!response.ok) throw new Error("Failed to fetch answers");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching answers for question ID ${id}:`, error);
      return [];
    }
  }

  // 🔹 Fake function: Récupérer toutes les questions (Données fictives)
  static async fakeFindAll() {
    return [
      new Question(
        1,
        "What is JavaScript?",
        101,
        1,
        "2025-03-06",
        "2025-03-06",
        ["Answer 1", "Answer 2"]
      ),
      new Question(
        2,
        "Best way to learn CSS?",
        102,
        2,
        "2025-03-05",
        "2025-03-05",
        ["Answer 3"]
      ),
      new Question(
        3,
        "How does the event loop work?",
        103,
        1,
        "2025-03-04",
        "2025-03-04",
        []
      ),
    ];
  }

  // 🔹 Fake function: Trouver une question par ID (Données fictives)
  static async fakeFindById(id) {
    const questions = await Question.fakeFindAll();
    return questions.find((q) => q.id_question === id) || null;
  }

  // 🔹 Fake function: Récupérer les réponses associées (Données fictives)
  static async fakeGetAnswers(id) {
    const question = await Question.fakeFindById(id);
    return question ? question.answers : [];
  }
}
