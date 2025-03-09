import { DetailView } from "../views/detailView/detailView.js";
import { BaseLayout } from "../views/layoutView/layoutView.js";
import { Question } from "../models/questionModel.js";

export class DetailController {
  constructor(app, params) {
    this.app = app;
    this.params = params;
    this.view = new DetailView();
    this.layout = new BaseLayout();
    this.question = new Question();
  }

  async render() {
    if (!this.params.id) {
      console.error("No question ID found in URL");
      window.location.href = "/";
      return;
    }

    try {
      const featureQuestion = await this.question.findById(this.params.id);
      const featureAnswers = featureQuestion.answers;

      // Rendu de la vue avec le layout
      const content = this.view.render(featureQuestion, featureAnswers);
      this.app.innerHTML = this.layout.wrap(content);
    } catch (error) {
      console.error("Erreur lors du rendu de la page des questions:", error);
      alert("Une erreur est survenue lors du chargement de la question.");
      this.app.innerHTML = "Une erreur est survenue"; // Rendu d'un message simple
    }
  }
}