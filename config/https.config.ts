import * as http from 'http';
import * as redirectHttps from 'redirect-https';
import { create } from 'greenlock-express';

import { unsecurePort, securePort, host } from './keys.config';

const httpsApp = create({
    server: 'staging',
    approveDomains(options, certs, cb) {
        if (certs) {
            options.domains = certs.altnames;
        }
        else {
            options.email = 'sskeen9@gmail.com';
            options.agreeTos = true;
        }
        
        cb(null, { certs, options });
    }
});

http.createServer(httpsApp.middleware(redirectHttps({ port: securePort, })))
    .listen(unsecurePort, () => {
        console.log(`Listening for connections to redirect from http to https on ${ host }:${ unsecurePort }`);
    });

export {
    httpsApp,
};