import Updateposition from './input.js';

const refreshButton = document.querySelector('.refresh');
const submitButton = document.querySelector('#submit');
const namevalue = document.querySelector('#name');
const score = document.querySelector('#score');
const scoreList = document.querySelector('#scores');
const Form = document.querySelector('form');
const displayError = (message) => {
  const container = document.querySelector('.container-2');
  const errorMessage = document.createElement('div');
  errorMessage.setAttribute('class', 'error-message');
  errorMessage.textContent = message;
  container.appendChild = errorMessage;
};
const newCompetitor = (data) => {
  while (scoreList.firstChild) {
    scoreList.removeChild(scoreList.firstChild);
  }
  data.forEach((person) => {
    const contestant = document.createElement('li');
    const contestantID = data.indexOf(person) + 1;
    contestant.setAttribute('id', `${contestantID}`);
    contestant.innerHTML = `${person.user}:${person.score}`;
    scoreList.appendChild(contestant);
  });
};
const submitScore = (e) => {
  e.preventDefault();
  const updatePosition = new Updateposition(namevalue.value, score.value);
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/austin/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatePosition),
  })
    .then((response) => {
      Form.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Check if the form is valid
        if (!response.ok) {
          // If the form is not valid, display an error message
          displayError('Leaderboard score was not created correctly');
        } else {
          // If the form is valid, submit it
          Form.reset();
        }
      });
    });
  Form.reset();
};
const displayScore = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/austin/scores/')
    .then((response) => response.json())
    .then((data) => {
      newCompetitor(data.result);
    });
};

submitButton.addEventListener('click', submitScore);
refreshButton.addEventListener('click', displayScore);
displayScore();
