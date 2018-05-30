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
 * Delete a secret
 * @param {string} key The key of the secret to delete
 */
module.exports.delete = function deleteFn(key) {
    if (secrets[key]) {
        delete secrets[key];
    }
};


/**
 * Get a secret by name
 * @param name {string} The name of the secret to get
 * @returns {Secret|null}
 */
module.exports.getByName = function getByName(name) {
    for (let key in secrets) {
        if (secrets[key].getName() === name) {
            return secrets[key];
        }
    }

    return null;
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