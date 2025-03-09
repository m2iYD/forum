import { Question } from "../models/questionModel.js";
import { Theme } from "../models/themeModel.js";
import { BaseLayout } from "../views/layoutView/layoutView.js";
import { QuestionView } from "../views/questionView/questionView.js";

/**
 * Contrôleur pour la page des questions
 */
export class QuestionController {
  constructor(app, params) {
    this.app = app;
    this.params = params;
    this.questionView = new QuestionView();
    this.layout = new BaseLayout();
    this.question = new Question();
    this.theme = new Theme();
  }

  /**
   * Affiche la page des questions
   */
  async render() {
    try {
      const featuredQuestions = await this.question.findAll();
      const featuredThemes = await this.theme.findAll();

      // Rendu de la vue avec le layout
      const content = this.questionView.render(featuredQuestions, featuredThemes);
      this.app.innerHTML = this.layout.wrap(content);
    } catch (error) {
      console.error("Erreur lors du rendu de la page des questions:", error);
      this.app.innerHTML = this.view.renderError();
    }
  }
}
