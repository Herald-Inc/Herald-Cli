#!/usr/bin/env node

import { program } from 'commander';
import { init, deploy, destroy } from '../src/main.js';

program.version('1.0.0');

program
  .command('init')
  .description('Initialize Herald for deployment')
  .action(init);

program
  .command('deploy')
  .description('Deploy Herald to AWS')
  .action(deploy);

program
  .command('destroy')
  .description('Delete Herald from AWS')
  .action(destroy);

program.parse(process.argv);