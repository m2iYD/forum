/**
 * Modèle pour la gestion des produits
 */
export class ProductModel {
  constructor() {
    this.apiUrl = "https://api.example.com/products"; // À remplacer par votre vraie API
    this.products = [
      {
        id: 1,
        name: "Produit 1",
        description: "Description du produit 1",
        price: 29.99,
        featured: true,
      },
      {
        id: 2,
        name: "Produit 2",
        description: "Description du produit 2",
        price: 39.99,
        featured: true,
      },
      {
        id: 3,
        name: "Produit 3",
        description: "Description du produit 3",
        price: 49.99,
        featured: true,
      },
      {
        id: 4,
        name: "Produit 4",
        description: "Description du produit 4",
        price: 59.99,
        featured: false,
      },
      {
        id: 5,
        name: "Produit 5",
        description: "Description du produit 5",
        price: 69.99,
        featured: false,
      },
      {
        id: 6,
        name: "Produit 6",
        description: "Description du produit 6",
        price: 79.99,
        featured: false,
      },
    ];
  }

  /**
   * Simule un appel API avec un délai
   * @param {any} data - Les données à retourner
   * @returns {Promise} Une promesse qui résout avec les données
   */
  async simulateApiCall(data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 300);
    });
  }

  /**
   * Récupère tous les produits
   * @returns {Promise<Array>} Liste des produits
   */
  async getProducts() {
    try {
      // Simulation d'un appel API
      return await this.simulateApiCall(this.products);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      return [];
    }
  }

  /**
   * Récupère un produit par son ID
   * @param {string|number} id - ID du produit
   * @returns {Promise<Object|null>} Le produit ou null si non trouvé
   */
  async getProductById(id) {
    try {
      const numId = parseInt(id, 10);
      const product = this.products.find((p) => p.id === numId);
      return await this.simulateApiCall(product || null);
    } catch (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      return null;
    }
  }

  /**
   * Récupère les produits à la une
   * @returns {Promise<Array>} Liste des produits à la une
   */
  async getFeaturedProducts() {
    try {
      const featuredProducts = this.products.filter((p) => p.featured);
      return await this.simulateApiCall(featuredProducts);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits à la une:",
        error
      );
      return [];
    }
  }

  /**
   * Recherche des produits
   * @param {string} query - Terme de recherche
   * @returns {Promise<Array>} Liste des produits correspondants
   */
  async searchProducts(query) {
    try {
      const searchResults = this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
      return await this.simulateApiCall(searchResults);
    } catch (error) {
      console.error("Erreur lors de la recherche des produits:", error);
      return [];
    }
  }
}
