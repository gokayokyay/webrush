/* eslint-disable no-console */
/*
  Example from https://github.com/uNetworking/uWebSockets.js/blob/master/examples/JsonPost.js
*/
const webrush = require('../lib');

const app = webrush();

app.get('/', (req, res) => {
  res.send('Hello from webrush!');
});

app.post('/', (req, res) => {
  app.readJSON(
    res,
    obj => {
      res.json(obj);
    },
    () => {
      res.send('Invalid request');
    },
  );
});

app.listen(3000, success => {
  if (success) {
    console.log('Server started on port:', 3000);
    console.log(
      `Execute: curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"xyz"}' http://localhost:3000/`,
    );
  } else {
    console.log('Error while listening on port:', 3000);
  }
});
