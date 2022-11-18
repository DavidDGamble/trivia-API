export default class QandAs {
  constructor() {
    this.questions = [];
    this.answers = [];
    this.wrongAnswers = [];
    this.userAnswers = [];
    this.index = 0;
  }

  counter() {
    this.index++;
  }

  shuffle(index) {
    let ansArray = this.wrongAnswers[index];
    ansArray.push(this.answers[index]);
    let currentIndex = ansArray.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [ansArray[currentIndex], ansArray[randomIndex]] = [ansArray[randomIndex], ansArray[currentIndex]];
    }
    return ansArray;
  }

  check() {
    let correctAnswers = 0;
    for (let index = 0; index <= this.answers.length - 1; index++) {
      if (this.answers[index] === this.userAnswers[index]) {
        correctAnswers++;
      }
    } 
    return correctAnswers;
  } 
} 