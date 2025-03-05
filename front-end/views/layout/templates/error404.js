/**
 * Template pour la page 404
 * @returns {string} HTML de la page 404
 */
export class Error404 {
  constructor() {
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques à la page d'accueil
   */
  loadStyles() {
    if (!document.querySelector('link[href*="error.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/layout/styles/error.css";
      document.head.appendChild(link);
    }
  }

  render() {
    return `
        <div class="error-page container page-transition">
            <div class="error-content">
                <h1>404 - Page Non Trouvée</h1>
                <p>Désolé, la page que vous recherchez n'existe pas.</p>
                <div class="error-actions">
                    <a href="/" class="btn btn-primary" data-link>
                        Retour à l'accueil
                    </a>
                </div>
            </div>
        </div>
    `;
  }
}
