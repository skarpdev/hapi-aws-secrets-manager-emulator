const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const Path = require('path');

/**
 * @param {object} config Configuration object
 * @returns {Hapi.Server} The hapi server instance
 */
async function go(config) {
  const server = new Hapi.Server({
    port: config.PORT,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, '..', 'public')
        }
    }
  });

  /**
   * Register logging
   */
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      logPayload: false,
    }
  });

  await server.register(require('./plugin/error-response'));

  /**
   * Static file serving
   */
  await server.register(Inert);

  /**
   * Register view and authentication stack
   */
  await server.register(Vision);

  /**
   * Get our views in
   */
  await server.register(require('./plugin/views'));

  /**
   * Management stuff
   */
  await server.register(require('./plugin/management'));

    /**
     * AWS stuff
     */
    await server.register(require('./plugin/aws'));

  /**
   * Start and return
   */
  await server.start();
  return server;
}

module.exports = go;
