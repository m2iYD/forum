export class Theme {
  constructor() {
    this.apiUrl = "http://localhost:8001/api/themes";
  }

  async findAll() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error("Failed to fetch themes");
      const themes = await response.json();
      return themes;
    } catch (error) {
      console.error("Error fetching themes:", error);
      return [];
    }
  }

  async findById(id) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new Error("Theme not found");
      const theme = await response.json();
      return theme;
    } catch (error) {
      console.error(`Error fetching theme with ID ${id}:`, error);
      return null;
    }
  }
}
