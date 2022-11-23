export class TriviaQs {
  static getQs(num, category, difficulty, type) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=${type}`;
      request.addEventListener('loadend', function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(this.statusText);
        }
      });
      request.open('GET', url, true);
      request.send();
    });
  }
}

export function handleError(response) {
  if (response.response_code === 0) {
    return 'success';
  } else if (response.response_code === 1) {
    return `NO RESULTS: Could not return results. The API doesn't have enough questions for your query.`;
  } else if (response.response_code === 2) {
    return `IVALID PARAMETER: Contains an invalid parameter. Arguements passed in aren't valid.`;
  } else if (response.response_code === 3) {
    return `TOKEN NOT FOUND: Session Token does not exist.`;
  } else if (response.response_code === 4) {
    return `TOKLEN EMPTY: Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.`;
  }
}