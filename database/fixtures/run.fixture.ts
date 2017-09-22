import * as chalk from 'chalk';
import { Model, Document } from 'mongoose';

interface IFixtureSaved {
    errored?: any;
    updated?: Document;
    created?: Document;
    removed?: Document;
}

async function runFixture({ name, fixture, model, primaryKey }: { name: string; fixture: any[]; model: Model<Document>; primaryKey: string; }) {
    let logString = '';
    
    const runResults = model.find()
        .then(data => {
            const matchingFixtures = [];
            
            const fixtureSave = data
                .map(doc => {
                    return (() => {
                        const match = fixture.find(obj => obj[primaryKey] == doc[primaryKey]);
                        
                        if (!match) {
                            return model.remove(doc)
                                .then(removed => ({ removed }));
                        }
                        
                        matchingFixtures.push(match);
                        
                        return model.update(doc, match)
                            .then(updated => ({ updated }));
                    })()
                        .catch(errored => ({ errored }));
                });
            
            const newFixtures = fixture
                .filter(obj => !matchingFixtures.includes(obj))
                .map(obj => model.create(obj)
                                .then(created => ({ created }))
                                .catch(errored => ({ errored })));
            
            return Promise.all([
                ...fixtureSave,
                ...newFixtures,
            ] as IFixtureSaved[]);
        }, errored => [{ errored }]);
    
    const results = await runResults;
    const errors = [];
    const newRecords = [];
    const updatedRecords = [];
    const removedRecords = [];
    
    results
        .forEach(({ errored, created, updated, removed }) => {
            if (errored) {
                errors.push(errored);
                logString += chalk.red(errored) + '\n';
            }
            if (created) {
                newRecords.push(created);
            }
            if (updated) {
                updatedRecords.push(updated);
            }
            if (removed) {
                removedRecords.push(removed);
            }
        });
    
    if (errors.length) {
        logString += chalk.yellow(`${ name } fixture ran with errors.  Review the log or console output for more details.`);
    }
    else {
        logString += chalk.green(`${ name } fixture ran successfully.`);
    }
    
    logString += `\n${
        chalk.white(errors.length + newRecords.length + updatedRecords.length + removedRecords.length + ' fixtures') }, ${
        chalk.green(newRecords.length + ' created') }, ${
        chalk.yellow(updatedRecords.length + ' updated') }, ${
        chalk.magenta(removedRecords.length + ' removed') }, ${
        chalk.red(errors.length + ' errored') }\n`;
    
    return logString;
}

export {
    runFixture,
};