const { configureResponse } = require('../utils/helpers');

class Router {
  /**
   * Router function with the base http methods.
   * Usage: let router = new Router('/books', app);
   * router.get('/get', callback);
   * @param {string} route - Path to register the router. Eg: /books
   * @param {App} app - App object to register the router.
   */
  constructor(route = '', app) {
    this.route = route;
    this.app = app.app;
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
    this.app.get(this.route + path, (res, req) => {
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
    this.app.post(this.route + path, (res, req) => {
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
    this.app.put(this.route + path, (res, req) => {
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
    this.app.del(this.route + path, (res, req) => {
      configureResponse(res);
      callback(req, res);
    });
  }
}

module.exports = Router;
