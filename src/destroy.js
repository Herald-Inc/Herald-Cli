import sh from 'shelljs';
import inquirer from "inquirer";
import CONSTANTS from '../lib/constants.js';
const { APP_NAME, COMMANDS, KEY_NAME } = CONSTANTS;

const options = { stdio: "pipe" };

export default async function destroy() {
  try {
    const confirm = await inquirer.prompt([
      {
        type: "confirm",
        name: "delete",
        message: "Would you like to proceed with deleting Herald from your AWS account?"
      }
    ])
    if (confirm.delete) {
      console.log(confirm)
      sh.cd(APP_NAME);
      sh.exec(COMMANDS.DESTROY);
      sh.exec(`${COMMANDS.DELETE_KEY} ${KEY_NAME}`);
    }
  } catch (error) {
    console.error(error);
  }
}