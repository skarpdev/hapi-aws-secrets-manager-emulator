const Secret = require('main/Secret');
const secrets = require('main/secrets');
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



/**
 * Pre-loads secrets defined in a given directory
 * @param {object} config Configuration object
 */
module.exports = function preloadSecrets(config) {
    fromFiles(config);
};