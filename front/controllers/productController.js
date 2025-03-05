import { ProductView } from "../views/product/productView.js";
import { ProductModel } from "../models/productModel.js";
import { BaseLayout } from "../views/layout/baseLayout.js";
import { navigateTo } from "../router.js";

/**
 * Contrôleur pour la gestion des produits
 */
export class ProductController {
  /**
   * Initialise le contrôleur des produits
   * @param {HTMLElement} app - L'élément DOM principal de l'application
   * @param {Object} params - Les paramètres de la route
   */
  constructor(app, params) {
    this.app = app;
    this.params = params;
    this.view = new ProductView();
    this.model = new ProductModel();
    this.layout = new BaseLayout();
  }

  /**
   * Affiche la page des produits (liste ou détail)
   */
  async render() {
    let content;

    try {
      // Si nous avons un ID dans les paramètres, afficher le détail
      if (this.params.id) {
        const product = await this.model.getProductById(this.params.id);
        if (!product) {
          navigateTo("/404");
        }
        content = this.view.renderDetail(product);
      } else {
        const products = await this.model.getProducts();
        content = this.view.renderList(products);
      }

      // Rendu de la vue avec le layout
      this.app.innerHTML = this.layout.wrap(content);

      // Initialisation des événements
      this.initializeEvents();
    } catch (error) {
      console.error("Erreur lors du rendu:", error);
      this.app.innerHTML = this.view.renderError();
    }
  }

  /**
   * Initialise les événements en fonction de la vue active
   */
  initializeEvents() {
    if (this.params.id) {
      this.initializeDetailEvents();
    } else {
      this.initializeListEvents();
    }
  }

  /**
   * Initialise les événements pour la liste des produits
   */
  initializeListEvents() {
    this.app.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.target.closest("button").dataset.id;
        if (productId) {
          const url = `/products/${productId}`;
          console.log("Navigation vers:", url);
          window.dispatchEvent(
            new CustomEvent("navigate", {
              detail: { url },
            })
          );
        } else {
          console.error("ID du produit non trouvé");
        }
      });
    });
  }

  /**
   * Initialise les événements pour le détail d'un produit
   */
  initializeDetailEvents() {
    const addToCartButton = this.app.querySelector(".add-to-cart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.target.dataset.id;
        this.handleAddToCart(productId);
      });
    }
  }

  /**
   * Gère l'ajout au panier
   * @param {string} productId - L'ID du produit à ajouter
   */
  handleAddToCart(productId) {
    console.log(`Produit ${productId} ajouté au panier`);
    alert("Produit ajouté au panier !");
  }
}
