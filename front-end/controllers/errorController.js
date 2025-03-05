import { Error404 } from "../views/layout/templates/error404.js";
import { BaseLayout } from "../views/layout/baseLayout.js";

/**
 * Contrôleur pour la page d'erreur
 */
export class ErrorController {
  constructor(app) {
    this.app = app;
    this.view = new Error404();
    this.layout = new BaseLayout();
  }

  render() {
    // Rendu de la vue avec le layout
    const content = this.view.render();
    this.app.innerHTML = this.layout.wrap(content);
  }
}
