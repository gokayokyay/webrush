/* eslint-disable no-console */
const webrush = require('../lib');

const app = webrush();

app.get('/', (req, res) => {
  res.send('Hello from webrush!');
});

app.listen(3000, success => {
  if (success) {
    console.log('Server started on port:', 3000);
  } else {
    console.log('Error while listening on port:', 3000);
  }
});
