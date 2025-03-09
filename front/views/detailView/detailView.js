import { renderFeaturedAnswers } from "./tpl/featuredAnswers.js";
import { renderFeaturedQuestion } from "./tpl/featuredQuestion.js";

/**
 * Vue pour la page de détail d'une question
 */
export class DetailView {
  constructor() {
    this.loadStyles();
  }

  /**
   * Charge les styles spécifiques à la page de détail d'une question
   */
  loadStyles() {
    if (!document.querySelector('link[href*="detail.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/views/detailView/style.css";
      document.head.appendChild(link);
    }
  }

  /**
   * Génère le HTML de la page de détail d'une question
   * @returns {string} Le HTML de la page
   */
  render(featureQuestion, featureAnswers) {
    return `
            <section id="question-detail">
                <article id="quest" class="card question-card">
                    ${renderFeaturedQuestion(featureQuestion)}
                </article>

                <div class="filter-actions">
                    <button class="filter-btn sort-popularity">Sort by Popularity</button>
                    <button class="filter-btn sort-date">Sort by Date</button>
                </div>

                <section class="answers-section">
                    <h3>Answers</h3>
                    <ul id="answers-list">
                        ${renderFeaturedAnswers(featureAnswers)}
                    </ul>
                </section>
            </section>
          `;
  }
}
