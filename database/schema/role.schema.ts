import { Schema, model, Document, Model } from 'mongoose';

export interface IRole {
    name: string,
    description?: string,
    _id?: string,
}

export type RoleDocument = Document & IRole;

const Role = new Schema({
    name: { type: String, required: true },
    description: String,
});

export default model('Role', Role) as Model<Document & IRole>;