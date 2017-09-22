import * as https from 'https';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as chalk from 'chalk';

import { host, securePort } from './config/keys.config';
import { httpsApp } from './config/https.config';

import decorate from './middleware/decorator.middleware';
import delegate from './routes/delegator.router';

const app = express();

decorate(app);

delegate(app);

https.createServer(httpsApp.httpsOptions, httpsApp.middleware(app))
    .listen(securePort, () => console.log(`App running and listening at ${ chalk.cyan('%s:%s') }`, host, securePort));