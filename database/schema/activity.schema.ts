import { Schema, model, Document, Model } from 'mongoose';

export interface IActivity {
    
}

export type ActivityDocument = Document & IActivity & {
    
};

const Activity = new Schema({
    timestamp: { type: Number, required: true },
    edit: { type: Schema.Types.ObjectId, ref: 'Edit' },
    route: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: Schema.Types.ObjectId, ref: 'ActivityType' },
    
});

Activity.pre('save', function (next) {
    if ((<ActivityDocument> this).isNew)
        this.timestamp = Date.now();
    next();
});

Activity.pre

export default model('Activity', Activity) as Model<ActivityDocument>;