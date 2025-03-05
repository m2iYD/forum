/**
 * Import des contrôleurs nécessaires pour chaque route
 */
import { HomeController } from "./controllers/homeController.js";
import { ProductController } from "./controllers/productController.js";
import { ErrorController } from "./controllers/errorController.js";

/**
 * Classe Router - Gère la navigation et le routage de l'application
 */
export class Router {
  /**
   * Initialise le routeur avec l'élément DOM principal de l'application
   * @param {HTMLElement} app - L'élément DOM principal de l'application
   */
  constructor(app) {
    this.app = app;
    this.routes = [
      { path: "/", controller: HomeController },
      { path: "/products", controller: ProductController },
      { path: "/products/:id", controller: ProductController },
      { path: "/404", controller: ErrorController },
    ];
    this.init();
  }

  /**
   * Initialise les écouteurs d'événements pour la navigation
   */
  init() {
    // Gérer la navigation initiale
    window.addEventListener("popstate", () => {
      this.handleRoute(window.location.pathname);
    });

    // Gérer les clics sur les liens
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-link]");
      if (link) {
        e.preventDefault();
        this.navigateTo(link.getAttribute("href"));
      }
    });

    // Gérer l'événement de navigation personnalisé
    window.addEventListener("navigate", (e) => {
      this.navigateTo(e.detail.url);
    });

    // Gérer la route initiale
    this.handleRoute(window.location.pathname);
  }

  /**
   * Navigue vers une nouvelle URL
   * @param {string} path - Le chemin de destination
   */
  navigateTo(path) {
    console.log("Navigation demandée vers:", path);
    history.pushState(null, null, path);
    this.handleRoute(path);
  }

  /**
   * Gère le routage vers un chemin spécifique
   * @param {string} path - Le chemin de la route
   */
  async handleRoute(path) {
    console.log("Routage pour le chemin:", path);

    // Vérifier si le chemin demandé est une ressource (fichier avec extension)
    if (path.includes(".")) {
      return; // Laisser Live Server gérer les ressources
    }

    const { route, params } = this.findRoute(path);

    if (route) {
      try {
        await this.loadController(route, params);
      } catch (error) {
        console.error("Erreur lors du chargement du contrôleur:", error);
        this.show404();
      }
    } else {
      console.log("Route non trouvée, affichage de la page 404");
      this.show404();
    }
  }

  /**
   * Trouve la route correspondante et extrait ses paramètres
   * @param {string} path - Le chemin à analyser
   * @returns {Object} - Le contrôleur et les paramètres de la route
   */
  findRoute(path) {
    const pathSegments = path
      .split("/")
      .filter((segment) => segment.length > 0);

    for (const route of this.routes) {
      const routeSegments = route.path
        .split("/")
        .filter((segment) => segment.length > 0);

      if (this.matchRoute(routeSegments, pathSegments)) {
        const params = {};

        routeSegments.forEach((segment, index) => {
          if (segment.startsWith(":")) {
            params[segment.slice(1)] = pathSegments[index];
          }
        });

        return { route: route.controller, params };
      }
    }

    return { route: null, params: {} };
  }

  /**
   * Compare les segments de la route avec ceux du chemin
   * @param {string[]} routeSegments - Segments de la route définie
   * @param {string[]} pathSegments - Segments du chemin actuel
   * @returns {boolean} - True si les segments correspondent, false sinon
   */
  matchRoute(routeSegments, pathSegments) {
    if (routeSegments.length !== pathSegments.length) {
      return false;
    }

    return routeSegments.every((segment, index) => {
      if (segment.startsWith(":")) {
        return true; // C'est un paramètre dynamique
      }
      return segment === pathSegments[index];
    });
  }

  /**
   * Charge et initialise le contrôleur approprié
   * @param {Class} Controller - La classe du contrôleur à instancier
   * @param {Object} params - Les paramètres de la route
   */
  async loadController(Controller, params) {
    try {
      console.log(
        "Chargement du contrôleur:",
        Controller.name,
        "avec params:",
        params
      );
      const controller = new Controller(this.app, params);
      await controller.render();
    } catch (error) {
      console.error("Erreur lors du chargement du contrôleur:", error);
      this.show404();
    }
  }

  /**
   * Affiche la page 404
   */
  show404() {
    console.log("Affichage de la page 404");
    this.navigateTo("/404");
  }
}

/**
 * Fonction d'initialisation du routeur
 * @param {HTMLElement} app - L'élément DOM principal de l'application
 * @returns {Router} - Instance du routeur
 */
export function initRouter(app) {
  return new Router(app);
}
