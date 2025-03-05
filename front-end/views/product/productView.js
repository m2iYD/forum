import { renderProductList } from "./templates/list.js";
import { renderProductDetail } from "./templates/detail.js";
import { renderProductCard } from "./templates/productCard.js";
import { ProductModel } from "../../models/productModel.js";

/**
 * Vue pour la page des produits
 */
export class ProductView {
  constructor() {
    this.productModel = new ProductModel();
    // Importer les styles spécifiques aux produits
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques aux produits
   */
  loadStyles() {
    if (!document.querySelector('link[href*="product.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/product/styles/product.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Génère le HTML pour la liste des produits
   * @param {Array} products - Liste des produits à afficher
   * @returns {string} Le HTML de la liste des produits
   */
  renderList(products) {
    return renderProductList(products, renderProductCard);
  }

  /**
   * Génère le HTML pour un produit spécifique
   * @param {Object} product - Le produit à afficher
   * @returns {string} Le HTML du détail du produit
   */
  renderDetail(product) {
    return renderProductDetail(product);
  }

  async render(params = {}) {
    console.log("Rendu de la vue produit avec params:", params);

    if (params.id) {
      // Vue détail
      try {
        const product = await this.productModel.getById(params.id);
        console.log("Produit trouvé:", product);
        return renderProductDetail(product);
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        return renderProductDetail(null); // Affichera la page 404
      }
    } else {
      // Vue liste
      const products = await this.productModel.getAll();
      console.log("Liste des produits chargée:", products.length, "produits");
      return renderProductList(products);
    }
  }
}
