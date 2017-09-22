import { IActivityType } from '../../schema/activity-types.schema';
import ActivityType from '../../controllers/activity-types.controller';

const fixture: IActivityType[] = [
    { name: 'api' },
    { name: 'navigation' },
    { name: 'edit' },
    { name: 'comment' },
];

const model = ActivityType;

const primaryKey = 'name';

const name = 'ActivityType';

export {
    name,
    fixture,
    model,
    primaryKey,
};