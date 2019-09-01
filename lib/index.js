const uwsApp = require('uWebSockets.js').App;
const uwsSSLApp = require('uWebSockets.js').SSLApp;
const { configureResponse, readJSON } = require('./utils/helpers');
// eslint-disable-next-line no-unused-vars
class App {
  /**
   * Create the main app
   * @param {boolean} ssl - true if you want to use SSL.
   * @param {object} sslOptions - Object with key_file_name and cert_file_name properties
   */
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

  /**
   * Callback for configuring req and res
   * @callback callback
   * @param {object} req - Request object
   * @param {object} res - Response object
   */

  /**
   * Register get request
   * @param {string} path - Route that you want to register get request
   * @param {callback} callback - Callback function to return
   */

  get(path, callback) {
    this.app.get(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }
  /**
   * Register post request
   * @param {string} path - Route that you want to register post request
   * @param {callback} callback - Callback function to return
   */

  post(path, callback) {
    this.app.post(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }
  /**
   * Register put request
   * @param {string} path - Route that you want to register put request
   * @param {callback} callback - Callback function to return
   */

  put(path, callback) {
    this.app.put(path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }
  /**
   * Register del request
   * @param {string} path - Route that you want to register del request
   * @param {callback} callback - Callback function to return
   */

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
