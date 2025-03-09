/**
 * Vue pour le pied de page du site
 */
export class FooterView {
    constructor() {
      this.loadStyles();
    }
  
    /**
     * Charge les styles spécifiques au pied de page
     */
    loadStyles() {
      if (!document.querySelector('link[href*="footer.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/views/footerView/style.css";
        document.head.appendChild(link);
      }
    }
  
    /**
     * Génère le HTML du pied de page
     * @returns {string} Le HTML du pied de page
     */
    render() {
      return `
              <footer class="site-footer">
                  <div class="footer-content">
                      <p>&copy; ${new Date().getFullYear()} &copy; DxY. Tous droits réservés.</p>
                  </div>
              </footer>
          `;
    }
  }
  