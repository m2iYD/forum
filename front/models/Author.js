export class Author {
  constructor(id_author, firstname, lastname, email) {
    this.id_author = id_author;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  // 🔹 Récupérer tous les auteurs via API
  static async findAll() {
    try {
      const response = await fetch("http://localhost:8001/authors");
      if (!response.ok) throw new Error("Failed to fetch authors");
      const authors = await response.json();
      return authors.map(
        (a) => new Author(a.id_author, a.firstname, a.lastname, a.email)
      );
    } catch (error) {
      console.error("Error fetching authors:", error);
      return [];
    }
  }

  // 🔹 Trouver un auteur par ID via API
  static async findById(id) {
    try {
      const response = await fetch(`http://localhost:8001/authors/${id}`);
      if (!response.ok) throw new Error("Author not found");
      const a = await response.json();
      return new Author(a.id_author, a.firstname, a.lastname, a.email);
    } catch (error) {
      console.error(`Error fetching author with ID ${id}:`, error);
      return null;
    }
  }

  // 🔹 Fake function: Récupérer tous les auteurs (Données fictives)
  static async fakeFindAll() {
    return [
      new Author(
        "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "John",
        "Doe",
        "john.doe@example.com"
      ),
      new Author(
        "4e94a1b0-9d02-48f1-b930-e8965fe112c4",
        "Jane",
        "Doe",
        "jane.doe@example.com"
      ),
      new Author(
        "5f57cd1f-4792-4aef-b7f9-e3d72fce4106",
        "Alice",
        "Smith",
        "alice.smith@example.com"
      ),
    ];
  }

  // 🔹 Fake function: Trouver un auteur par ID (Données fictives)
  static async fakeFindById(id) {
    const authors = await Author.fakeFindAll();
    return authors.find((a) => a.id_author === id) || null;
  }
}
