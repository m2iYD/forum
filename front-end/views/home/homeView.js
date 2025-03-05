import { renderFeaturedProducts } from "./templates/featuredProducts.js";

/**
 * Vue pour la page d'accueil
 */
export class HomeView {
  constructor() {
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques à la page d'accueil
   */
  loadStyles() {
    if (!document.querySelector('link[href*="home.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/home/styles/home.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Génère le HTML de la page d'accueil
   * @param {Array} featuredProducts - Liste des produits à afficher
   * @returns {string} Le HTML de la page
   */
  render(featuredProducts) {
    return `
            <div class="home-page container page-transition">
                <h1>Bienvenue sur notre site</h1>
                <div class="content card">
                    <p>Découvrez nos produits en cliquant sur le lien "Produits" dans la navigation.</p>
                    
                    <section class="featured-products">
                        <h2>Produits à la une</h2>
                        <div class="products-grid grid">
                            ${renderFeaturedProducts(featuredProducts)}
                        </div>
                    </section>
                </div>
            </div>
        `;
  }
}
