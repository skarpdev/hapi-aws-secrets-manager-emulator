const secrets = require('../../secrets');
const Secret = require('../../Secret');

function getSecretValue(req, h) {
    const secretId = req.payload.SecretId;

    // TODO do the same validation as AWS

    const secret = secrets.getByName(secretId);

    if (secret === null) {
        // TODO do the same as AWS
        throw new Error(`There is not secret with ID "${secretId}"`);
    }

    console.log(secret);
    console.log(secret.getName());
    console.log(secret.getContent());
    console.log(secret.getBinary());

    return {
        "ARN": `arn:aws:secretsmanager:us-west-2:123456789012:secret:${secret.getName()}-a1b2c3`,
        "CreatedDate": 1.523477145713E9,
        "Name": `${secret.getName()}`,
        "SecretString": `${secret.getContent()}`,
        "SecretBinary": `${secret.getBinary()}`,
        "VersionId": "EXAMPLE1-90ab-cdef-fedc-ba987SECRET1",
        "VersionStages": ["AWSPREVIOUS"]
    }
}

function createSecret(req, h) {

    const secret = new Secret(
        req.payload.Name,
        req.payload.SecretString,
        req.payload.SecretBinary
    );

    console.log(req.payload);

    secrets.save(secret);
    
    return {
        "ARN": `arn:aws:secretsmanager:us-west-2:123456789012:secret:${secret.getName()}-a1b2c3`,
        "CreatedDate": 1.523477145713E9,
        "Name": `${secret.getName()}`,
        "SecretString": `${secret.getContent()}`,
        "SecretBinary": `${secret.getBinary()}`,
        "VersionId": "EXAMPLE1-90ab-cdef-fedc-ba987SECRET1",
        "VersionStages": ["AWSPREVIOUS"]
    }
}

function updateSecret(req, h) {
    secrets.delete(req.payload.SecretId);

    console.log(req.payload);

    const secret = new Secret(
        req.payload.SecretId,
        req.payload.SecretString,
        req.payload.SecretBinary
    );

    secrets.save(secret);
    
    return {
        "ARN": `arn:aws:secretsmanager:us-west-2:123456789012:secret:${secret.getName()}-a1b2c3`,
        "CreatedDate": 1.523477145713E9,
        "Name": `${secret.getName()}`,
        "SecretString": `${secret.getContent()}`,
        "SecretBinary": `${secret.getBinary()}`,
        "VersionId": "EXAMPLE1-90ab-cdef-fedc-ba987SECRET1",
        "VersionStages": ["AWSPREVIOUS"]
    }
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
