export class Answer {
  constructor(id_answer, content, nblike, nbdislike, user_id, question_id, created_at, updated_at) {
    this.id_answer = id_answer;
    this.content = content;
    this.nblike = nblike;
    this.nbdislike = nbdislike;
    this.user_id = user_id;
    this.question_id = question_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // 🔹 Récupérer toutes les réponses via API
  static async findAll() {
    try {
      const response = await fetch("http://localhost:8001/answers");
      if (!response.ok) throw new Error("Failed to fetch answers");
      const answers = await response.json();
      return answers.map(a => new Answer(a.id_answer, a.content, a.nblike, a.nbdislike, a.user_id, a.question_id, a.created_at, a.updated_at));
    } catch (error) {
      console.error("Error fetching answers:", error);
      return [];
    }
  }

  // 🔹 Trouver une réponse par ID via API
  static async findById(id) {
    try {
      const response = await fetch(`http://localhost:8001/answers/${id}`);
      if (!response.ok) throw new Error("Answer not found");
      const a = await response.json();
      return new Answer(a.id_answer, a.content, a.nblike, a.nbdislike, a.user_id, a.question_id, a.created_at, a.updated_at);
    } catch (error) {
      console.error(`Error fetching answer with ID ${id}:`, error);
      return null;
    }
  }

  // 🔹 Récupérer toutes les réponses d'une question spécifique via API
  static async findByQuestionId(question_id) {
    try {
      const response = await fetch(`http://localhost:8001/questions/${question_id}/answers`);
      if (!response.ok) throw new Error("Failed to fetch answers for question");
      const answers = await response.json();
      return answers.map(a => new Answer(a.id_answer, a.content, a.nblike, a.nbdislike, a.user_id, a.question_id, a.created_at, a.updated_at));
    } catch (error) {
      console.error(`Error fetching answers for question ID ${question_id}:`, error);
      return [];
    }
  }

  // 🔹 Fake function: Récupérer toutes les réponses (Données fictives)
  static async fakeFindAll() {
    return [
      new Answer(1, "JavaScript is great!", 10, 2, 101, 1, "2025-03-06", "2025-03-06"),
      new Answer(2, "Try Tailwind CSS.", 5, 0, 102, 2, "2025-03-05", "2025-03-05"),
      new Answer(3, "Event loop works asynchronously.", 7, 1, 103, 3, "2025-03-04", "2025-03-04"),
    ];
  }

  // 🔹 Fake function: Trouver une réponse par ID (Données fictives)
  static async fakeFindById(id) {
    const answers = await Answer.fakeFindAll();
    return answers.find(a => a.id_answer === id) || null;
  }

  // 🔹 Fake function: Récupérer les réponses pour une question (Données fictives)
  static async fakeFindByQuestionId(question_id) {
    const answers = await Answer.fakeFindAll();
    return answers.filter(a => a.question_id === question_id);
  }
}
