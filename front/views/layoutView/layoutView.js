import { HeaderView } from "../headerView/headerView.js";
import { FooterView } from "../footerView/footerView.js";

/**
 * Layout de base de l'application
 */
export class BaseLayout {
  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques au layout, en évitant les doublons
   */
  loadStyles() {
    if (!document.querySelector('link[href*="layout.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/layoutView/style.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Enveloppe le contenu dans le layout de base
   * @param {string} content - Le contenu à envelopper
   * @returns {string} Le HTML complet avec le layout
   */
  wrap(content) {
    return `
            ${this.header.render()}
            <main class="main-content">
                ${content}
            </main>
            ${this.footer.render()}
        `;
  }
}
