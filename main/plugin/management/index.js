const Secret = require('../../Secret');
const secrets = require('../../secrets');


const register = async (server) => {
    server.route({
        method: 'POST',
        path: '/management/add',
        config: {
            handler: async (req, h) => {
                const s = new Secret(
                    req.payload.name,
                    req.payload.content
                );

                secrets.save(s);

                return h.redirect('/');
            }
        }
    });


    server.route({
        method: 'GET', // no this is not RESTful, but it is convenient for the user
        path: '/management/delete',
        config: {
            handler: async (req, h) => {
                const key = req.query.key;

                secrets.delete(key);

                return h.redirect('/');
            }
        }
    });
};

const plugin = {
    register,
    name: 'management-plugin',
    version: '1.0.0'
};

module.exports = {
    plugin
};
