import chalk from 'chalk';
import boxen from 'boxen';

const getStarted = chalk.white("To get started, run ") + chalk.cyan.bold("herald init");
const greeting = chalk.white.bold("Welcome to the Herald Cli!");

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);
console.log(getStarted);