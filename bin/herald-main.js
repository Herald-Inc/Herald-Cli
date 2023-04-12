#!/usr/bin/env node

import chalk from 'chalk';
import { init, deploy, destroy } from '../src/main.js';

const errorMsg = chalk.white("command not found. Try ") + chalk.cyan("'herald help'")

const commands = {
  init,
  deploy,
  destroy,
};

const [node, script, command] = process.argv;

if (commands[command]) {
  commands[command]();
} else {
  console.log(errorMsg);
}

// switch (command) {
//   case 'init':
//     init();
//     break;
//   case 'deploy':
//     deploy();
//     break;
//   case 'help':
//     help();
//     break;
//   case 'destroy':
//     destroy();
//     break;
//   default:
//     console.log(errorMsg);
// }


// import { program } from 'commander';

// program.version('1.0.0');

// program
//   .command('init')
//   .description('Initialize your app for deployment')
//   .action(init);

// program
//   .command('deploy')
//   .description('Deploy your app to AWS')
//   .action(deploy);

// program
//   .command('destroy')
//   .description('Destroy your app on AWS')
//   .action(destroy);

// program.parse(process.argv);