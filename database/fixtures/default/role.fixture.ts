import Role from '../../controllers/role.controller';
import { IRole } from '../../schema/role.schema';

const fixture: IRole[] = [
    { name: 'Admin' },
    { name: 'Moderator' },
    { name: 'Contributor' },
    { name: 'Member' },
    { name: 'Guest' },
];

const model = Role;

const primaryKey = 'name';

const name = 'Role';

export {
    name,
    fixture,
    model,
    primaryKey,
};