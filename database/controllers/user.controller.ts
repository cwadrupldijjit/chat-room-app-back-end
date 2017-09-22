import { Model } from 'mongoose';
import UserModel, { IUser, UserDocument } from '../schema/user.schema';
import { createController } from './controller-factory';

export default createController(UserModel, {
    findOrCreate(userArgs: IUser) {
        return UserModel
            .findOne(userArgs)
            .then(user => {
                if (!user) {
                    return UserModel.create(userArgs);
                }
                
                return user;
            });
    }
});