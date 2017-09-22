import { Schema, model, Document, Model } from 'mongoose';

import { hash, isValid } from '../../auth/bcrypt.auth';
import { IActivity } from './activity.schema';
import { IRole } from './role.schema';
import { ISession } from './session.schema';

export interface IUser {
    role?: IRole;
    activity?: IActivity[];
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
    facebookId?: string;
    _id?: string;
    session?: ISession;
}

export type UserDocument = Document & IUser & {
    isCorrectPassword(password: string): boolean;
};

const User = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    facebookId: String,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    activity: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    session: { type: Schema.Types.ObjectId, ref: 'Session' },
});

User.pre('save', function(next) {
    if (!(<UserDocument> this).isModified())
        return next();
    
    if (this.isModified('password'))
        this.password = hash(this.password);
    
    return next();
});

User.methods.isCorrectPassword = function isCorrectPassword(password) {
    return isValid(password, this.password);
};

export default model('User', User) as Model<UserDocument>;