/* eslint-disable no-console */
/*
  Example from https://github.com/uNetworking/uWebSockets.js
*/
const webrush = require('../lib');

const app = webrush(true, {
  key_file_name: 'examples/keys/key.pem',
  cert_file_name: 'examples/keys/cert.pem',
});

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
