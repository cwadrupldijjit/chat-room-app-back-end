import * as express from 'express';
import * as chalk from 'chalk';

function logRequests() {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(`${ chalk.yellow(req.method) } to ${ chalk.blue(req.originalUrl) }`);
        next();
    }
}

export default logRequests;