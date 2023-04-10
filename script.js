const refreshButton = document.querySelector('.refresh');
const submitButton = document.querySelector('#submit');
const Name = document.querySelector('#name').value;
const Score = document.querySelector('#score').value;
const scoreList = document.querySelector('#scores');
const Form = document.querySelector('form');
const displayError = (message) => {
  const container = document.querySelector('.container-2');
  const errorMessage = document.createElement('div');
  errorMessage.setAttribute('class', 'error-message');
  errorMessage.textContent = message;
  container.appendChild = errorMessage;
};
const updatePosition = {};
updatePosition[Name] = Score;
const submitScore = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'leaderboard/json',
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
          displayError('Please fill out all required fields.');
        } else {
          // If the form is valid, submit it
          Form.submit();
        }
      });
    })
    .catch((error) => { console.error(error); });
};

const displayScore = () => {
  window.addEventListener('Onload', () => {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores')
      .then((response) => response.json())
      .then((data) => {
        const contestant = document.createElement('div');
        contestant.innerHTML = data.result;
        scoreList.appendChild(contestant);
      })
      .catch((error) => { console.error(error); });
  });
};

submitButton.addEventListener('click', () => {
  submitScore();
});
refreshButton.addEventListener('click', () => {
  displayScore();
});
