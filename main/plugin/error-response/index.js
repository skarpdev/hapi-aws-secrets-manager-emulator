const internals = {};

const register = async (server) => {
  server.ext('onPreResponse', internals.implementation);
};

internals.implementation = (request, h) => {
  if (request.response.isServer) {
    const payload = request.response.output.payload;

    payload.message = request.response.message;
    payload.data = request.response.data;
    payload.stack = request.response.stack.split('\n');
  }

  return h.continue;
};

const plugin = {
  register,
  name: 'plugin-error-response',
  version: '1.0.0'
};

module.exports = {
  plugin
};
