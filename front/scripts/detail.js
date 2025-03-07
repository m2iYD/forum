import { Answer } from "../models/Answer.js";

async function loadAnswers() {
  const answers = await Answer.findAll();
  console.log("Answers from API:", answers);
}

async function loadAnswerById(id) {
  const answer = await Answer.findById(id);
  console.log(answer ? `Answer found: ${answer.content}` : "Answer not found!");
}

async function loadAnswersByQuestion(question_id) {
  const answers = await Answer.findByQuestionId(question_id);
  console.log(`Answers for question ${question_id}:`, answers);
}

// 🔹 Tester avec API
loadAnswers();
loadAnswerById(1);
loadAnswersByQuestion(1);

// 🔹 Tester avec données fictives
async function testFakeData() {
  console.log("Fake answers:", await Answer.fakeFindAll());
  console.log("Fake answer by ID 2:", await Answer.fakeFindById(2));
  console.log("Fake answers for question ID 1:", await Answer.fakeFindByQuestionId(1));
}

testFakeData();
