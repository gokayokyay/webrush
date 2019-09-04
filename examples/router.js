/* eslint-disable no-console */
const webrush = require('../lib');

const app = webrush();
const router = webrush.Router('/api', app);

app.get('/', (req, res) => {
  res.send('Hello from webrush!');
});

router.get('/bonjour', (req, res) => {
  res.send('Bonjour de webrush.Router!');
});

app.listen(3000, success => {
  if (success) {
    console.log('Server started on port:', 3000);
    console.log('Visit http://localhost:3000/api/bonjour');
  } else {
    console.log('Error while listening on port:', 3000);
  }
});
