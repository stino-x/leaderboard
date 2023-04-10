fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/');
.then(res => console.log(res.json()))
.then(data => console.log(data))
.catch(err => console.log(err));    