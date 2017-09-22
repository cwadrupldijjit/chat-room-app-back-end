import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import logRequests from './log-requests.middleware';
import { passport } from '../auth';

function decorate(app: express.Application) {
    app.use(logRequests());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(passport.initialize());
    
    return app;
}

export default decorate;