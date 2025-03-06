import { HeaderView } from "../header/headerView.js";
import { FooterView } from "../footer/footerView.js";

/**
 * Layout de base de l'application
 */
export class BaseLayout {
  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
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
