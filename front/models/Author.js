export class Author {
  constructor(id_author, firstname, lastname, email, password) {
    this.id_author = id_author;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  // Retourner le nom complet de l'auteur
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  // Simuler la récupération de tous les auteurs (remplacer par une requête API/DB)
  static async findAll() {
    return [
      new Author(1, "Alice", "Johnson", "alice@example.com"),
      new Author(2, "Bob", "Smith", "bob@example.com"),
    ];
  }

  // Trouver un auteur par son ID
  static async findById(id) {
    const authors = await Author.findAll();
    return authors.find(author => author.id_author === id) || null;
  }

  // Trouver un auteur par son email (utile pour l'authentification)
  static async findByEmail(email) {
    const authors = await Author.findAll();
    return authors.find(author => author.email === email) || null;
  }
}
