export class Theme {
  constructor(id_theme, name) {
    this.id_theme = id_theme;
    this.name = name;
  }

  // 🔹 Récupérer tous les thèmes via API
  static async findAll() {
    try {
      const response = await fetch("http://localhost:8001/themes");
      if (!response.ok) throw new Error("Failed to fetch themes");
      const themes = await response.json();
      return themes.map(t => new Theme(t.id_theme, t.name));
    } catch (error) {
      console.error("Error fetching themes:", error);
      return [];
    }
  }

  // 🔹 Trouver un thème par ID via API
  static async findById(id) {
    try {
      const response = await fetch(`http://localhost:8001/themes/${id}`);
      if (!response.ok) throw new Error("Theme not found");
      const t = await response.json();
      return new Theme(t.id_theme, t.name);
    } catch (error) {
      console.error(`Error fetching theme with ID ${id}:`, error);
      return null;
    }
  }

  // 🔹 Fake function: Récupérer tous les thèmes (Données fictives)
  static async fakeFindAll() {
    return [
      new Theme(1, "JavaScript"),
      new Theme(2, "CSS"),
      new Theme(3, "HTML"),
      new Theme(4, "React"),
      new Theme(5, "Vue.js"),
      new Theme(6, "Node.js"),
    ];
  }

  // 🔹 Fake function: Trouver un thème par ID (Données fictives)
  static async fakeFindById(id) {
    const themes = await Theme.fakeFindAll();
    return themes.find(theme => theme.id_theme === id) || null;
  }

}
