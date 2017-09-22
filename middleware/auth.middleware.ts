import * as e from 'express';

import { decodeJwt,
         verifyJwt,
         IJwtPayload } from '../auth';
import { User } from '../database';

declare module 'express' {
    interface Request {
        token: string;
        tokenPayload: IJwtPayload;
    }
}

function handleJwt() {
    
    
    return (req: e.Request, res: e.Response, next: e.NextFunction) => {
        const authHeader = req.header('Authorization');
        
        if (authHeader.includes('Bearer')) {
            req.token = authHeader.split(' ')[1];
            req.tokenPayload = verifyJwt(req.token);
        }
    };
}

function getUser() {
    return (req: e.Request, res: e.Response, next: e.NextFunction) => {
        User
            .findById(req.tokenPayload.user)
            .then(user => res.status(user ? 200 : 401).send(user || { message: 'Not authenticated' }))
            .catch(err => res.status(500).send({ message: err }));
    };
}

export {
    handleJwt,
    getUser,
};