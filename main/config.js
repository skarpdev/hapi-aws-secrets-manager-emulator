const nconf = require('nconf');

nconf
    .argv()
    .env()
    .defaults({
        NODE_ENV: 'dev',
        SECRETS_MANAGER_PRELOAD_DIRECTORY: ''
    });

module.exports = {
    NODE_ENV: nconf.get('NODE_ENV'),
    PRELOAD_DIRECTORY: nconf.get('SECRETS_MANAGER_PRELOAD_DIRECTORY')
};
