import sh from 'shelljs';
import { writeFileSync } from "fs";
import chalk from 'chalk';
import boxen from 'boxen';
import Spinner from '../lib/spinner.js';
import { promisify } from "util";
const exec = promisify(sh.exec);

import CONSTANTS from '../lib/constants.js';
const { APP_NAME, REPO, KEY_PATH, KEY_NAME, COMMANDS, APP_DEPENDENCIES } = CONSTANTS;

const deployBoxOptions = {
  padding: 0.9,
  margin: {top: 1, bottom: 1, left: 4},
  borderStyle: "round",
  borderColor: "cyan",
  dimBorder: true,
}

const deployMsg = chalk.cyanBright("herald deploy");
const deployBox = boxen(deployMsg, deployBoxOptions);

const options = { silent: true };

const spinner = new Spinner(
  "Herald initialization:"
);

async function validateDependencies() {
  for (let dependency of APP_DEPENDENCIES) {
    try {
      await exec(`${dependency} --version`, options);
    } catch (error) {
      spinner.fail(`${dependency}-cli was not found. Please install and try again.`);
      process.exit();
    }
  }
}

async function cloneRepo() {
  try {
    await exec(`git clone ${REPO} ${APP_NAME}`, options);
  } catch (error) {
    spinner.fail(chalk.red(error));
    process.exit();
  }
}

async function installAppDependencies() {
  try {
    sh.cd(APP_NAME);
    await exec("npm install", options);
  } catch (error) {
    spinner.fail(chalk.red(error));
    process.exit();
  }
}

async function generateSSHKey() {
  let key;

  try {
    const res = await exec(`${COMMANDS.CREATE_KEY} ${KEY_NAME}`, options);
    key = JSON.parse(res).KeyMaterial;  
  } catch (error) {
    spinner.fail(chalk.red(error));
    process.exit();
  }

  return key;
}

async function writeKeyToAppDir(key) {
  try {
    writeFileSync(KEY_PATH, key);
  } catch (error) {
    spinner.fail(chalk.red(error));
    process.exit();
  }
}

export default async function init() {
  spinner.start();
  
  try {
    spinner.update("checking for cli dependencies...");
    spinner.start();
    await validateDependencies();
    spinner.succeed(chalk.cyan("CLI dependencies verified"));

    spinner.update(`Cloning the app from GitHub into ${APP_NAME} directory...`);
    spinner.start();
    await cloneRepo();
    spinner.succeed(chalk.cyan(`Herald cloned into ${APP_NAME} directory`));

    spinner.update("Installing CDK app dependencies...");
    spinner.start();
    await installAppDependencies();
    spinner.succeed(chalk.cyan("App dependencies installed"));

    spinner.update("Generating SSH key...");
    spinner.start();
    const key = await generateSSHKey();
    spinner.succeed(chalk.cyan("SSH key generated"));

    spinner.update(`Writing SSH key to ${KEY_PATH}...`);
    spinner.start();
    await writeKeyToAppDir(key);
    spinner.succeed(chalk.cyan(`SSH key written to ${KEY_PATH} in herald-app`));
  } catch (error) {
    spinner.fail(chalk.red(error));
    process.exit(1);
  }

  spinner.succeed(chalk.cyanBright("Initialization Complete: Herald is ready for deployment!\n"))
  console.log(chalk.white("To deploy Herald to aws, use:"));
  console.log(deployBox);
}