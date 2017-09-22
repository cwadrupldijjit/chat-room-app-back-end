import * as yargs from 'yargs';
import * as chalk from 'chalk';

import { runDefaultFixtures } from './database/fixtures';

yargs
    .command('serve', 'start the server', commandsModule => {
        return commandsModule.option('port', {
            describe: 'port to listen on',
            default: 8769,
        });
    }, argv => {
        if (argv.verbose) {
            console.info(chalk.cyan('Starting server...'));
        }
        require('./server');
    })
    .command('db:fixture', 'run fixtures', optsMod => {
        return optsMod
            .option('import', {
                describe: 'run import fixtures',
            });
    }, argv => {
        runDefaultFixtures()
            .then(() => {
                process.exit();
            });
    })
    .argv;