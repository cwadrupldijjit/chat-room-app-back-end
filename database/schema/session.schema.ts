import { Schema, model, Document, Model } from 'mongoose';
import * as uuid from 'uuid/v1';

export interface ISession {
    _id?: string;
    token: string;
    user: string;
}

export type SessionDocument = Document & ISession;

const Session = new Schema({
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

Session.pre('save', function(next) {
    if (!(<SessionDocument> this).isModified())
        next();
    
    if ((<SessionDocument> this).isNew) {
        this.token = uuid();
    }
});

export default model('Session', Session) as Model<SessionDocument>;