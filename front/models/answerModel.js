export class Answer {
  constructor(
    id_answer,
    content,
    nblike,
    nbdislike,
    author,
    created_at,
    updated_at,
    question_id
  ) {
    this.apiUrl = "http://localhost:8001/api/answers";
    this.id_answer = id_answer;
    this.content = content;
    this.nblike = nblike;
    this.nbdislike = nbdislike;
    this.author = {
      firstname: author.firstname,
      lastname: author.lastname,
      email: author.email,
      id_author: author.id_author,
    };
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.question_id = question_id;
  }

  async findAll() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(this.apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch answers");
    }

    const answersData = await response.json();

    return answersData.map(
      (answerData) =>
        new Answer(
          answerData.id_answer,
          answerData.content,
          answerData.nblike,
          answerData.nbdislike,
          answerData.author,
          answerData.created_at,
          answerData.updated_at,
          answerData.question_id
        )
    );
  }

  async findById(id) {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Answer not found");
    }

    const data = await response.json();
    return new Answer(
      data.id_answer,
      data.content,
      data.nblike,
      data.nbdislike,
      data.author,
      data.created_at,
      data.updated_at,
      data.question_id
    );
  }

  async create(content, authorId, questionId) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${this.apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: content,
        author_id: authorId,
        question_id: questionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create answer: ${response.statusText}`);
    }

    const data = await response.json();
    return new Answer(
      data.id_answer,
      data.content,
      data.nblike,
      data.nbdislike,
      data.author,
      data.created_at,
      data.updated_at,
      data.question_id
    );
  }

  async update(id, updatedContent) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${this.apiUrl}/answers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: updatedContent.content,
        nb_like: updatedContent.nblike,
        nb_dislike: updatedContent.nbdislike,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update answer: ${response.statusText}`);
    }

    const data = await response.json();
    return new Answer(
      data.id_answer,
      data.content,
      data.nblike,
      data.nbdislike,
      data.author,
      data.created_at,
      data.updated_at,
      data.question_id
    );
  }

  async delete(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete answer: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}
