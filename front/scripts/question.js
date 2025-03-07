// document.addEventListener("DOMContentLoaded", () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get("id");
//     const token = localStorage.getItem("access_token");

//     if (!postId) {
//       document.getElementById("post-detail").innerHTML = "<p>Aucun post sélectionné.</p>";
//       return;
//     }
  
//     fetch(`http://localhost:8000/api/posts/${postId}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json",
//       "Authorization": "Bearer " + token }
//     })
//       .then(response => response.json())
//       .then(post => displayPostDetail(post))
//       .catch(error => {
//         console.error("Erreur lors du chargement du post:", error);
//         document.getElementById("post-detail").innerHTML = "<p>Erreur de chargement du post.</p>";
//       });
//   });
  
//   function displayPostDetail(post) {
//     const detailContainer = document.getElementById("post-detail");
//     detailContainer.innerHTML = `
//       <h2>${post.title}</h2>
//       <p><em>Par ${post.author ? post.author.username : "Inconnu"} le ${new Date(post.created_at).toLocaleDateString()}</em></p>
//       <div>${post.content}</div>
//       ${post.image_url ? `<img src="${post.image_url}" alt="${post.title}">` : ""}
//       <br>
//       <a href="index.html" class="btn">Retour à la liste</a>
//     `;
//   }
  
import { Question } from "../models/Question.js";

async function loadQuestions() {
  const questions = await Question.findAll();
  console.log("Questions from API:", questions);
}

async function loadQuestionById(id) {
  const question = await Question.findById(id);
  console.log(question ? `Question found: ${question.content}` : "Question not found!");
}

async function loadAnswers(id) {
  const answers = await Question.getAnswers(id);
  console.log(`Answers for question ${id}:`, answers);
}

// 🔹 Tester avec API
loadQuestions();
loadQuestionById(1);
loadAnswers(1);

// 🔹 Tester avec données fictives
async function testFakeData() {
  console.log("Fake questions:", await Question.fakeFindAll());
  console.log("Fake question by ID 2:", await Question.fakeFindById(2));
  console.log("Fake answers for question ID 1:", await Question.fakeGetAnswers(1));
}

testFakeData();
