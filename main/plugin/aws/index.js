const secrets = require('../../secrets');
const Secret = require('../../Secret');

function getSecretValue(req/*,  h */) {
    const secretId = req.payload.SecretId;

    // TODO do the same validation as AWS

    const secret = secrets.getByName(secretId);

    if (secret === null) {
        // TODO do the same as AWS
        throw new Error(`There is not secret with ID "${secretId}"`);
    }

    return createSecretResult(secret);
}

function createSecret(req/*, h */) {

    const secret = new Secret(
        req.payload.Name,
        req.payload.SecretString,
        req.payload.SecretBinary
    );

    secrets.save(secret);

    return createSecretResult(secret);
}

function updateSecret(req/*, h*/) {
    secrets.delete(req.payload.SecretId);

    const secret = new Secret(
        req.payload.SecretId,
        req.payload.SecretString,
        req.payload.SecretBinary
    );

    secrets.save(secret);
    return createSecretResult(secret);
}

function createSecretResult(secret) {
    var result =  {
        "ARN": `arn:aws:secretsmanager:us-west-2:123456789012:secret:${secret.getName()}-a1b2c3`,
        "CreatedDate": 1.523477145713E9,
        "Name": `${secret.getName()}`,
        "SecretString": `${secret.getContent()}`,
        "VersionId": "EXAMPLE1-90ab-cdef-fedc-ba987SECRET1",
        "VersionStages": ["AWSPREVIOUS"]
    }

    if (secret.getBinary() !== 'undefined') {
        result.SecretBinary = secret.getBinary();
    }

    return result;
}


const register = async (server) => {
    server.ext('onRequest', (req, h) => {
       if (req.headers['content-type'] === 'application/x-amz-json-1.1') {
           req.headers['x-content-type'] = req.headers['content-type'];
           req.headers['content-type'] = 'application/json';
       }

       return h.continue;
    });


    server.route({
        method: 'POST',
        path: '/',
        config: {
            handler: async (req, h) => {

                const target = req.headers['x-amz-target'];

                switch (target.toLowerCase()) {
                    case 'secretsmanager.getsecretvalue':
                        return getSecretValue(req, h);
                    case 'secretsmanager.createsecret':
                        return createSecret(req, h);
                    case 'secretsmanager.updatesecret':
                        return updateSecret(req, h);
                    default:
                        throw new Error(`Unsupported target ${target}`);
                }
            }
        }
    });
};

const plugin = {
    register,
    name: 'aws-plugin',
    version: '1.0.0'
};

module.exports = {
    plugin
};
