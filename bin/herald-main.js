#!/usr/bin/env node
// import shell from 'shelljs';
import chalk from 'chalk';
import { init, deploy, help, destroy } from '../src/main.js';

const errorMsg = chalk.white("command not found. Try ") + chalk.cyan("'herald help'")

const command = process.argv[2];

switch (command) {
  case 'init':
    init();
    break;
  case 'deploy':
    deploy();
    break;
  case 'help':
    help();
    break;
  case 'destroy':
    destroy();
    break;
  default:
    console.log(errorMsg);
}