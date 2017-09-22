import * as mongoose from 'mongoose';
import * as chalk from 'chalk';

import { connectString, dbName } from './keys.database';

let hasBootstrapped = false;

const connect = () => bootstrap();

async function bootstrap() {
    (<any> mongoose).Promise = Promise;
    
    return mongoose.connect(connectString, { useMongoClient: true })
        .then(() => {
            // mongoose.connection
            //     .once('open', () => {
                    console.log(chalk.green(`Now connected to ${ dbName }`));
                    hasBootstrapped = true;
                // })
            
        })
        .catch(e => {
            // .on('error', e => {
                console.error(chalk.red(e))
                throw e;
            // });
            
        });
    
    // return mongoose;
}

export {
    bootstrap,
    hasBootstrapped,
    connect,
};