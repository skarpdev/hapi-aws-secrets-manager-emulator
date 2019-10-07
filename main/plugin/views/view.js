const Mustache = require('mustache');
const path = require('path');
const secrets = require('../../secrets');

/**
 *
 * @param {Hapi.Server} server Hapi server instance
 */
const register = async (server) => {
  const partials = {};

  server.views({
    engines: {
      html: {
        compile: function (template) {
          Mustache.parse(template);
          return function (context) {
            return Mustache.render(template, context, partials);
          };
        },
        registerPartial: function (name, src) {
          partials[name] = src;
        }
      }
    },
    relativeTo: path.join(__dirname, '..', '..', '..'),
    path: 'public',
    partialsPath: path.join('public', 'partials')

  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false
    },
    handler: async (req, h) => {

      return h.view('index', {
          allSecrets: secrets.getAllAsAnonymous()
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/{filename}',
    handler: {
      file: (request) => {
        return request.params.filename;
      }
    }
  });
};

const plugin = {
  register,
  name: 'views',
  version: '1.0.0'
};

module.exports = {
  plugin
};
