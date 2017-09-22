import * as p from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { facebookId, facebookSecret } from './keys.auth';
import { User } from '../database';

function setUp(passport: p.Passport) {
    passport.use(new FacebookStrategy({
        clientID: facebookId,
        clientSecret: facebookSecret,
        callbackURL: '/auth/facebookCallback',
    }, (accessToken, refreshToken, profile, done) => {
        User
            .findOrCreate({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                facebookId: profile.id,
            })
            .then(user => done(null, user),
                  err => done(err));
    }));
    
    return passport;
}

export default setUp;