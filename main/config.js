const nconf = require('nconf');

nconf
  .argv()
  .env()
  .defaults({
    NODE_ENV: 'dev'
  });

module.exports = {
  NODE_ENV: nconf.get('NODE_ENV')
};
