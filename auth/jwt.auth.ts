import * as p from 'passport';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid/v1';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { host } from '../config/keys.config';
import { jwtSecret } from './keys.auth';
import { UserDocument, Session, SessionDocument, ISession } from '../database';

export interface IJwtPayload {
    user: string;
    role: string;
    exp: number;
    iss: string;
    aud: string;
    session: string;
    refreshToken: string;
}

export default function setUp(passport: p.Passport) {
    passport.use(new JWTStrategy({
        secretOrKey: jwtSecret,
        jwtFromRequest(req) {
            const authHeader = req.header('Authorization');
            
            if (authHeader) {
                return authHeader.split(' ')[1];
            }
            
            return null;
        },
    }, (payload: IJwtPayload, done) => {
        
    }));
    
    return passport;
}

function createJwt(user: UserDocument) {
    const refreshToken = uuid();
    Session.findByIdAndUpdate(user.session._id, { token: refreshToken } as ISession)
        .catch(err => {
            console.error(err);
        });
    
    return jwt.sign({
        user: user._id,
        role: user.role._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        iss: host,
        aud: host,
        refreshToken,
    } as IJwtPayload, jwtSecret);
}

function verifyJwt(token) {
    return jwt.verify(token, jwtSecret) as IJwtPayload;
}

function decodeJwt(token) {
    return jwt.decode(token);
}

export {
    createJwt,
    verifyJwt,
    decodeJwt,
};