import { Schema, model, Document, Model } from 'mongoose';

export interface IActivityType {
    name: string;
    _id?: string;
}

export type ActivityTypeDocument = IActivityType & Document;

const ActivityType = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export default model('ActivityType', ActivityType) as Model<ActivityTypeDocument>;