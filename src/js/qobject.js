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
} 