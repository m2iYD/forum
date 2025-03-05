/**
 * Vue pour l'en-tête du site
 */
export class HeaderView {
  constructor() {
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques à l'en-tête
   */
  loadStyles() {
    if (!document.querySelector('link[href*="header.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/header/styles/header.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Génère le HTML de l'en-tête
   * @returns {string} Le HTML de l'en-tête
   */
  render() {
    const currentPath = window.location.pathname;
    return `
            <header class="site-header">
                <nav class="container">
                    <div class="nav-group">
                        <a href="/" class="nav-link ${
                          currentPath === "/" ? "active" : ""
                        }" data-link>
                            Accueil
                        </a>
                        <a href="/products" class="nav-link ${
                          currentPath.includes("/products") ? "active" : ""
                        }" data-link>
                            Produits
                        </a>
                    </div>
                </nav>
            </header>
        `;
  }
}
