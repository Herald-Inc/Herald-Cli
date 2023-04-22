import sh from "shelljs";
import inquirer from "inquirer"
import chalk from "chalk";
import { writeFileSync } from 'fs';
import CONSTANTS from "../lib/constants.js";
const { APP_NAME, CONFIG_PATH, COMMANDS } = CONSTANTS;

const options = { silent: true };

function vpcIdAndCidrObj(answer) {
  let [id, cidr] = answer.vpc.split(" -- ");
  id = id.slice(4);
  cidr = cidr.slice(6);
  return {heraldVpc: {id, cidr}};
}

function getVPCIDs() {
  const vpcs = sh.exec(COMMANDS.GET_VPCS, options);

  return JSON.parse(vpcs).Vpcs.map(vpc => {
    return { id: vpc.VpcId, cidr: vpc.CidrBlock };
  });
}

export default async function deploy() {
  const vpcs = getVPCIDs();
  let answer;

  try {
    answer = await inquirer.prompt([
      {
        type: "list",
        name: "vpc",
        message: "Choose a VPC to deploy to:",
        choices: () => vpcs.map(vpc => `ID: ${vpc.id} -- CIDR: ${vpc.cidr}`),
      }
    ]);
  } catch (error) {
    console.log(error)
  }

  try {
    const confirm = await inquirer.prompt([
      {
        type: "confirm",
        name: "choice",
        message: `Confirm this is the VPC you would like to deploy to: ${chalk.cyan(answer.vpc)}`,
      }
    ]);

    if (confirm.choice) {
      sh.cd(APP_NAME);
      writeFileSync(CONFIG_PATH, JSON.stringify(vpcIdAndCidrObj(answer)));
      sh.exec(COMMANDS.DEPLOY);
    }
  } catch (error) {
    console.error(error);
  }
}

//