/**
 * @type {Secret}
 */
const secrets = [];

/**
 * Save a secret
 * @param {Secret} secret 
 */
module.exports.save = function save(secret) {
    secrets.push(secret);

    for (let i in secrets) {
        console.log(secrets[i].getName(), ' = ', secrets[i].getContent());
    }
}
