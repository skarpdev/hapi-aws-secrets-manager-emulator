const nconf = require('nconf');

nconf
    .argv()
    .env()
    .defaults({
        NODE_ENV: 'dev',
        SECRETS_MANAGER_PRELOAD_DIRECTORY: '',
        SECRETS_MANAGER_PORT: 3000
    });

module.exports = {
    NODE_ENV: nconf.get('NODE_ENV'),
    PRELOAD_DIRECTORY: nconf.get('SECRETS_MANAGER_PRELOAD_DIRECTORY'),
    PORT: nconf.get('SECRETS_MANAGER_PORT')
};
