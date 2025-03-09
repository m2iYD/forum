import { renderFeaturedQuestions } from "./tpl/featuredQuestions.js";
import { renderFeaturedThemes } from "./tpl/featuredThemes.js";

/**
 * Vue pour la page des questions
 */
export class QuestionView {
  constructor() {
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques à la page des questions
   */
  loadStyles() {
    if (!document.querySelector('link[href*="home.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/questionView/style.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Génère le HTML de la page des questions
   * @param {Array} featureQuestions - Liste des questions à afficher
   * @param {Array} featureThemes - Liste des themes à afficher
   * @returns {string} Le HTML de la page
   */
  render(featureQuestions, featureThemes) {
    return `
            <div class="home-page container page-transition">
                <div class="content-card">
                <label for="theme">Filter by Theme :</label>
                    <div class="card-header">                  
                      <select id="theme" name="theme" required>
                          ${renderFeaturedThemes(featureThemes)}
                      </select>
                      <button id="sort-by-popularity">Trier par popularité</button>
                    </div>
                    <div id="questions-list">
                        ${renderFeaturedQuestions(featureQuestions)}
                    </div>
                </div>
            </div>
        `;
  }
}
