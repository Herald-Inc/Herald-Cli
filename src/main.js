#!/usr/bin/env node

// init will setup the aws configurations
import init from './init.js'

// deploy will... deploy
import deploy from './deploy.js';

// help will let the user know the commands and what they do
import help from './help.js';

// connect will connect the user to our imaginary UI
// import connect from './connect';

// destroy destroys our hopes and dreams...and our stack.
import destroy from './destroy.js';

export { init, deploy, help, destroy };