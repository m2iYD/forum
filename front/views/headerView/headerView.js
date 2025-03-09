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
        link.href = "/views/headerView/style.css";
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
                  <h1 class="site-brand">QA - Forum</h1>
                  <nav class="container">
                      <div class="nav-group">
                          <a href="/" class="nav-link ${
                            currentPath === "/" ? "active" : ""
                          }" data-link>
                              Accueil
                          </a>
                          <a href="/questions" class="nav-link ${
                            currentPath.includes("/questions") ? "active" : ""
                          }" data-link>
                              Questions
                          </a>
                          <a href="/profile" class="nav-link ${
                            currentPath.includes("/profile") ? "active" : ""
                          }" data-link>
                              Profile
                          </a>
                          <a href="/login" class="nav-link ${
                            currentPath.includes("/login") ? "active" : ""
                          }" data-link>
                              Login/Register
                          </a>
                      </div>
                  </nav>
              </header>
          `;
    }
  }
  