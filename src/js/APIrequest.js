export default class TriviaQs {
  static getQs(num, category, difficulty, type) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=${type}`;
      request.addEventListener('loadend', function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject([this, response]);
        }
      });
      request.open('GET', url, true);
      request.send();
    });
  }
}