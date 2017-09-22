import { Model, Document } from 'mongoose';

function createController<T extends Document, S = {[key: string]: any}>(model: Model<T>, extendable: S = {} as S) {
    type R = Function & S & {
        model: Model<T>;
    };
    const controller: R = (() => {}) as any;
    
    Object.keys(extendable)
        .forEach(key => controller[key] = extendable[key]);
    
    controller.model = model;
    
    return new Proxy(controller, {
        get(target, property) {
            if (!target.hasOwnProperty(property))
                return target.model[property];
            
            return target[property];
        },
        set(target, property, value) {
            return true;
        },
        construct(target, args) {
            return new target.model(...args);
        }
    }) as R & Model<T>;
}

export {
    createController,
};