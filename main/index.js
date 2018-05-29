require('make-promises-safe');
const serverGo = require('./server');
const config = require('./config');
let server;

serverGo(config)
  .then(srv => {
    server = srv;
    console.info(`server running at ${srv.info.uri}`); // eslint-disable-line
  })
  .catch(err => {
    console.error('FATAL SHIT', err); // eslint-disable-line
  });

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', function () {
  console.info('stopping hapi server') // eslint-disable-line
  if(!server) process.exit(0); // eslint-disable-line

  server.stop({ timeout: 10000 }).then(function (err) {
    console.info('hapi server stopped'); // eslint-disable-line
    process.exit((err) ? 1 : 0); // eslint-disable-line
  });
});
