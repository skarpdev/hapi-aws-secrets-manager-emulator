const Secret = require('./Secret');
const secrets = require('./secrets');
const fs = require('fs');
const Path = require('path');

function addFileToSecrets(dir, filename) {
    const secretName = filename.replace(/\./g, '/');

    const content = fs.readFileSync(Path.join(dir, filename));

    secrets.save(new Secret(secretName, content));
}


function fromFiles(config) {
    const preloadDir = config.PRELOAD_DIRECTORY;

    if (preloadDir === '') {
        console.info('Skipping secret preloading as SECRETS_MANAGER_PRELOAD_DIRECTORY is not defined');
        return;
    }

    if (!fs.existsSync(preloadDir)) {
        console.error(`The given SECRETS_MANAGER_PRELOAD_DIRECTORY (${preloadDir}) does not exist`);
        return;
    }

    const files = fs.readdirSync(preloadDir);

    for (let i in files) {
        addFileToSecrets(preloadDir, files[i]);
    }
}


function fromEnvironment() {
    const env = process.env['SECRETS_MANAGER_SECRETS'] || null;

    if (env !== null) {
        const parsed = JSON.parse(env);

        for (let name in parsed) {
            secrets.save(new Secret(name, parsed[name]));
        }
    }
}



/**
 * Pre-loads secrets defined in a given directory
 * @param {object} config Configuration object
 */
module.exports = function preloadSecrets(config) {
    fromFiles(config);
    fromEnvironment();
};