import chalk from 'chalk';
import boxen from 'boxen';

const welcomeOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "cyan",
};
const greeting = chalk.white.bold("Welcome to the Herald CLI!");
const msgBox = boxen( greeting, welcomeOptions );

const initOptions = {
  padding: 0.9,
  margin: 1,
  borderStyle: "round",
  borderColor: "cyan"
}
const initMsg = chalk.white.bold("herald init");
const initBox = boxen( initMsg, initOptions );

const getStarted = chalk.cyan("To get started, run:");

console.log(msgBox);
console.log(getStarted);
console.log(initBox)
