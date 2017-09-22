import * as express from 'express';

import { host, securePort,  } from '../config/keys.config';

const SocketRouter = express.Router();

SocketRouter.get('/config', (req, res) => {
    res.send({ host, port: securePort, token: 'foo' + ':' + 'bar' });
});

export {
    SocketRouter,
};