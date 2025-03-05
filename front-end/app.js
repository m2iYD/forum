/**
 * Import du routeur de l'application
 */
import { initRouter } from "./routes.js";

/**
 * Classe App - Point d'entrée principal de l'application
 * Gère l'initialisation et la configuration globale
 */
class App {
  /**
   * Constructeur de l'application
   * Lance l'initialisation au démarrage
   */
  constructor() {
    this.init();
  }

  /**
   * Initialise l'application
   * - Attend que le DOM soit chargé
   * - Configure le routeur
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      // Récupération de l'élément racine de l'application
      const appElement = document.getElementById("app");
      if (!appElement) {
        console.error("L'élément #app n'a pas été trouvé dans le DOM");
        return;
      }

      // Initialisation du routeur avec l'élément racine
      this.router = initRouter(appElement);
    });
  }
}

// Démarrage de l'application
new App();
