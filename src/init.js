import sh from 'shelljs';
import { writeFileSync } from "fs";
import chalk from 'chalk';
import boxen from 'boxen';
import CONSTANTS from '../lib/constants.js';
const { APP_NAME, REPO, KEY_PATH, KEY_NAME, COMMANDS, APP_DEPENDENCIES } = CONSTANTS;

const deployBoxOptions = {
  padding: 0.8,
  margin: {top: 2, bottom: 1, left: 4},
  borderStyle: "single",
  borderColor: "cyan",
  dimBorder: true,
}

const deployMsg = chalk.white("herald deploy");
const deployBox = boxen(deployMsg, deployBoxOptions);
// const initMsg = chalk.white("\nInitialization Complete --> Herald is now ready for deployment!\n\n");
// const initBox = boxen(initMsg, initOptions);

const options = { silent: true };

function generateKey() {
  let res;
  try {
    console.log(chalk.white("Generating SSH key..."));
    res = sh.exec(`${COMMANDS.CREATE_KEY} ${KEY_NAME}`, options);
    console.log(chalk.cyan("Success --> Key generated"));
  } catch (error) {
    console.error(
      chalk.red("Failed to create SSH key. Please see error below:")
    );
    console.error(error);
    process.exit();
  }

  try {
    const key = JSON.parse(res).KeyMaterial;
    console.log(chalk.white(`Writing SSH key to ${KEY_PATH}...`));
    writeFileSync(KEY_PATH, key);
  } catch (error) {
    console.error(
      chalk.red("Failed to write key to file. Please see error below:", "red")
    );
    console.error(error);
    process.exit();
  }
}

function clone(repo) {
  try {
    console.log(chalk.white(`Cloning the app from GitHub into ${APP_NAME} directory...`))
    sh.exec(`git clone ${repo} ${APP_NAME}`, options);
    console.log(chalk.cyan("Success --> Repo cloned"));
  } catch (error) {
    console.error(chalk.red("Clone failed. Please see error below: "));
    console.error(error);
    process.exit();
  }
}

function installDependencies() {
  sh.cd(APP_NAME);

  try {
    console.log(chalk.white("Installing CDK app dependencies..."));
    sh.exec("npm install", options);
    console.log(chalk.cyan("Success --> Dependencies installed"));
  } catch (error) {
    console.error(chalk.red("Failed to install dependencies. Please see error below:"));
    console.error(error);
    process.exit();
  }
}

function verifyInstall(args) {
  args.forEach(arg => {
    try {
      sh.exec(`${arg} --version`, options);
    } catch (error) {
      console.error(`"${arg}" command is not available. Please install "${arg}" globally to use Herald CLI`);
    }
  });
}

export default async function init() {
  console.clear();

  try {
    console.log(chalk.white("Verifying AWS CLI, AWS CDK and Git are installed on your machine..."));
    verifyInstall(APP_DEPENDENCIES);
    console.log(chalk.cyan("Success --> CLI installations verified"));
  } catch (error) {
    console.error(error);
  }

  try {
    clone(REPO);
    installDependencies()
    generateKey();
    console.log(
      chalk.green("\nInitialization Complete --> Herald is now ready for deployment!\n\n") + 
      chalk.white("To deploy Herald to aws, use:") +
      deployBox
    );
  } catch (error) {
    console.error(error);
  }
}