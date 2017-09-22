import * as passport from 'passport';

import addFacebookTo from './facebook.auth';
import addLocalTo from './local.auth';
import addJwtTo from './jwt.auth';

addFacebookTo(passport);
addLocalTo(passport);
addJwtTo(passport);

export {
    passport,
};
