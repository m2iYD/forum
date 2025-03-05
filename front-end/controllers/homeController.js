import { HomeView } from "../views/home/homeView.js";
import { ProductModel } from "../models/productModel.js";
import { BaseLayout } from "../views/layout/baseLayout.js";

/**
 * Contrôleur pour la page d'accueil
 */
export class HomeController {
  constructor(app, params) {
    this.app = app;
    this.params = params;
    this.view = new HomeView();
    this.layout = new BaseLayout();
    this.productModel = new ProductModel();
  }

  /**
   * Affiche la page d'accueil et initialise les événements
   */
  async render() {
    try {
      // Récupération des produits à la une
      const featuredProducts = await this.productModel.getFeaturedProducts();

      // Rendu de la vue avec le layout
      const content = this.view.render(featuredProducts);
      this.app.innerHTML = this.layout.wrap(content);

      // Initialisation des événements
      this.initializeEvents();
    } catch (error) {
      console.error("Erreur lors du rendu de la page d'accueil:", error);
      this.app.innerHTML = this.view.renderError();
    }
  }

  /**
   * Initialise les gestionnaires d'événements
   */
  initializeEvents() {
    this.app.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", (e) => this.handleProductClick(e));
    });
  }

  /**
   * Gère le clic sur un produit
   * @param {Event} e - L'événement de clic
   */
  handleProductClick(e) {
    e.preventDefault();
    const productId = e.target.closest(".product-card").dataset.id;
    const url = `/products/${productId}`;
    window.dispatchEvent(new CustomEvent("navigate", { detail: { url } }));
  }
}
