import * as fs from 'fs';

import { hasBootstrapped,
         connect } from '../bootstrap.database';
import { runFixture } from './run.fixture';

async function runDefaultFixtures() {
    if (!hasBootstrapped) await connect();
    
    console.log('Running default fixtures...\n');
    
    const dir = fs.readdirSync(__dirname + '/default');
    
    console.time('fixture');
    
    const results = Promise
        .all(dir.map(filename => {
            return runFixture(require('./default/' + filename));
        }))
        .then(resultStrings => {
            console.info(resultStrings.join('\n'));
        })
        .catch(err => console.error(err))
        .then(() => console.timeEnd('fixture'));
    
    return results;
}

export {
    runFixture,
    runDefaultFixtures,
};