import * as express from 'express';

import { SocketRouter } from './socket.router';

function delegate(app: express.Application) {
    app.use('/socket', SocketRouter);
    
    return app;
}

export default delegate;