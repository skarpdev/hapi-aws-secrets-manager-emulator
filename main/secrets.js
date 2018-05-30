/**
 * @type {Object.<string, Secret>}
 */
const secrets = {};

/**
 * Save a secret
 * @param {Secret} secret 
 */
module.exports.save = function save(secret) {
    const key = secret.getLookupKey();

    secrets[key] = secret;
};

/**
 * @returns {Secret[]}
 */
module.exports.getAll = function getAll() {
    const all = [];

    for (let i in secrets) {
        all.push(secrets[i]);
    }

    return all;
};

/**
 * @returns {Object[]}
 */
module.exports.getAllAsAnonymous = function getAllAsAnonymous() {
    const all = [];

    for (let i in secrets) {
        all.push(secrets[i].asAnonymous());
    }

    return all;
};