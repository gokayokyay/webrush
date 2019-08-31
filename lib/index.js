const uwsApp = require('uWebSockets.js').App;
const uwsSSLApp = require('uWebSockets.js').SSLApp;
const { configureResponse, readJSON } = require('./utils/helpers');
// eslint-disable-next-line no-unused-vars
class App {
  constructor(
    ssl = false,
    sslOptions = {
      key_file_name: '',
      cert_file_name: '',
    },
  ) {
    if (ssl) {
      this.app = uwsSSLApp(sslOptions);
    } else {
      this.app = uwsApp();
    }
    this.readJSON = readJSON;
  }

  get(path, callback) {
    this.app.get(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }

  post(path, callback) {
    this.app.post(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }

  put(path, callback) {
    this.app.put(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }

  del(path, callback) {
    this.app.del(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }

  listen(
    host = '0.0.0.0',
    port,
    callback = token => {
      if (token) {
        // eslint-disable-next-line no-console
        console.log('Started listening on port:', port);
      } else {
        // eslint-disable-next-line no-console
        console.error('Error while listening to port:', port);
      }
    },
  ) {
    this.app.listen(host, port, callback);
    this.address = () => `${host}:${port}`;
  }
}

function appCreator(ssl, sslOptions) {
  return new App(ssl, sslOptions);
}

module.exports = appCreator;
