import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TriviaQs from './js/APIrequest.js';
import QandAs from './js/qobject.js';

// Buisness Logic
let qAndAs;


function getQs(num, category, difficulty, type) {
  let promise = TriviaQs.getQs(num, category, difficulty, type);
  promise.then(function(qData) {
    printElements(qData);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic -------------------------------------------------------------------

const printElements = (qData) => {
  qAndAs = new QandAs();
  let dataArray = qData.results;
  console.log(dataArray);
  dataArray.forEach(element => {
    if (element.type === 'multiple') {
      qAndAs.questions.push(element.question);
      qAndAs.answers.push(element.correct_answer);
      qAndAs.wrongAnswers.push(element.incorrect_answers);
    } else {
      qAndAs.questions.push(element.question);
      qAndAs.answers.push(element.correct_answer);
    }
  });
  console.log(qAndAs);
};

const printError = (errorArray) => {
  console.log(errorArray);
};

const popCard = () => {
  document.getElementById("qNum").innerHTML = qAndAs.index + 1;
  document.getElementById("question").innerHTML = qAndAs.questions[qAndAs.index];

}

const handleSubmit = (event) => {
  event.preventDefault();
  const userNum = document.getElementById('limit').value;
  const userCategory = document.getElementById('category').value;
  const userDifficulty = document.getElementById('difficulty').value;
  const userType = document.getElementById('type').value;
  getQs(userNum, userCategory, userDifficulty, userType);
  document.querySelector("#test").setAttribute("class", "hidden");
  document.querySelector(".card").removeAttribute("class", "hidden");
};

window.addEventListener('load', function () {
  document.getElementById('trivia').addEventListener('submit', handleSubmit);
});