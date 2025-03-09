import { BaseLayout } from "../views/layoutView/layoutView.js";
import { HomeView } from "../views/homeView/homeView.js";

/**
 * Contrôleur pour la page d'accueil
 */
export class HomeController {
  constructor(app, params) {
    this.app = app;
    this.params = params;
    this.view = new HomeView();
    this.layout = new BaseLayout();
    this.apiUrl = "http://localhost:8001/api/auth/login";
    this.init();
  }

  /**
   * Affiche la page d'accueil et initialise les événements
   */
  render() {
    this.app.innerHTML = this.layout.wrap(this.view.render());
  }

  async init(){
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "alice@example.com",
        password: "alice",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const accessToken = response.headers.get("Authorization")?.split(" ")[1];
    localStorage.setItem("access_token", accessToken);
    this.render();
  }
}

