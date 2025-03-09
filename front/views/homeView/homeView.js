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
      link.href = "/views/homeView/style.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Génère le HTML de la page d'accueil
   * @returns {string} Le HTML de la page
   */
  render() {
    return `
            <div class="home-page container page-transition">
                <h1>Welcome to our site, where you can ask and answer questions</h1>
            </div>
        `;
  }
}
