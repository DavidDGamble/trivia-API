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
  popCard();
  console.log(qData);
  console.log(qAndAs);
};

const printError = (errorArray) => {
  console.log(errorArray);
};

const popCard = () => {
  document.getElementById("qNum").innerHTML = qAndAs.index + 1;
  document.getElementById("question").innerHTML = qAndAs.questions[qAndAs.index];
  if (qAndAs.wrongAnswers.length === 0) {
    document.getElementById('true-false').removeAttribute('class', 'hidden');
    document.getElementById('true').checked = true;
  } else {
    document.getElementById('multi').removeAttribute('class', 'hidden');
    document.getElementById('1').checked = true;
    let choices = qAndAs.shuffle(qAndAs.index);
    document.getElementById('1display').innerHTML = choices[0];
    document.getElementById('1').setAttribute('value', `${choices[0]}`);
    document.getElementById('2display').innerHTML = choices[1];
    document.getElementById('2').setAttribute('value', `${choices[1]}`);
    document.getElementById('3display').innerHTML = choices[2];
    document.getElementById('3').setAttribute('value', `${choices[2]}`);
    document.getElementById('4display').innerHTML = choices[3];
    document.getElementById('4').setAttribute('value', `${choices[3]}`);
  }
  if (qAndAs.questions.length - 1 === qAndAs.index) {
    document.getElementById('next-btn').setAttribute('class', 'hidden');
    document.getElementById('finish-btn').removeAttribute('class', 'hidden');
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const userNum = document.getElementById('limit').value;
  const userCategory = document.getElementById('category').value;
  const userDifficulty = document.getElementById('difficulty').value;
  const userType = document.getElementById('type').value;
  getQs(userNum, userCategory, userDifficulty, userType);
  document.querySelector("#test").setAttribute("class", "hidden");
  document.getElementById("card").removeAttribute("class", "hidden");
};

const handleNext = (event) => {
  event.preventDefault();
  if (qAndAs.wrongAnswers.length === 0) {
    qAndAs.userAnswers.push(document.querySelector("input:checked.true-false").value);
  } else {
    qAndAs.userAnswers.push(document.querySelector("input:checked.multi").value);
  }
  qAndAs.counter();
  popCard();
};

const handleFinish = (event) => {
  event.preventDefault();
  if (qAndAs.wrongAnswers.length === 0) {
    qAndAs.userAnswers.push(document.querySelector("input:checked.true-false").value);
  } else {
    qAndAs.userAnswers.push(document.querySelector("input:checked.multi").value);
  }
  document.getElementById("card").setAttribute("class", "hidden");
  document.getElementById("answerCard").removeAttribute("class", "hidden");
  document.getElementById("numCorrect").innerHTML= `You got ${qAndAs.check()} out of ${qAndAs.answers.length} correct!`;
  document.getElementById('compare').innerHTML = null;
  for(let index = 0; index <= qAndAs.answers.length - 1; index++) {
    let userP = document.createElement("p");
    userP.innerHTML = `Your answer is ${qAndAs.userAnswers[index]}!`;
    document.getElementById("compare").append(userP);
    let correctP = document.createElement("p");
    correctP.innerHTML = `The correct answer is ${qAndAs.answers[index]}!`;
    correctP.setAttribute('class', 'green');
    document.getElementById("compare").append(correctP);
  }
};

const handleRestart = () =>{
  window.location.reload();
  
};

window.addEventListener('load', function () {
  document.getElementById('trivia').addEventListener('submit', handleSubmit);
  document.getElementById('next').addEventListener('click', handleNext);
  document.getElementById('finish').addEventListener('click', handleFinish);
  document.getElementById("restart").addEventListener("click", handleRestart);
});