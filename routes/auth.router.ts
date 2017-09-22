import * as express from 'express';

import { User } from '../database';
import { passport, createJwt } from '../auth';

const AuthRouter = express.Router();

AuthRouter
    .post('/login', passport.authenticate('local'), (req, res) => {
        
    });

AuthRouter
    .post('/register', (req, res) => {
        
        
        
    });

AuthRouter
    .get('/refresh', (req, res) => {
        
    });

export default AuthRouter;