import * as p from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../database';

function setUp(passport: p.Passport) {
    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        User
            .findOne({ username })
            .then(user => {
                if (user.isCorrectPassword(password)) {
                    return done(null, user);
                }
                done(null, false);
            }, err => done(err));
    }));
}

export default setUp;