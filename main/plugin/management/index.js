const Secret = require('main/Secret');
const secrets = require('main/secrets');


const register = async (server) => {
  server.route({
    method: 'POST',
    path: '/management/add',
    config: {
        handler: async (req, h) => {
            const s = new Secret(
                req.payload.name,
                req.payload.content
            );

            secrets.save(s);

            return h.redirect('/');
        }
    }
  });
};

const plugin = {
  register,
  name: 'management-plugin',
  version: '1.0.0'
};

module.exports = {
  plugin
};
