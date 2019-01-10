#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const problems = require("./problems");
const packageJSON = require("./package.json");

const verbose =
  process.argv.includes("--verbose") || process.argv.includes("--V")
    ? true
    : false;

const init = () => {
  console.log(
    chalk.blue(
      figlet.textSync("EulerJS", {
        font: "Doom",
        horizontalLayout: "full",
        verticalLayout: "default"
      })
    ),
    "\n",
    chalk.blue.bold(packageJSON.description),
    "\n"
  );
};

const userInput = () => {
  const questions = [
    {
      name: "PROBLEM_ID",
      type: "input",
      message: "Problem ID to solve:"
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  if (process.argv.includes("--version"))
    return console.log(`v${packageJSON.version}`);
  init();

  const solutions = Object.keys(problems);
  const input = await userInput();
  const { PROBLEM_ID } = input;

  if (!PROBLEM_ID) {
    console.log(chalk.yellow("\n⚠️ No Problem ID provided."));
    process.exit();
  }

  if (solutions.includes(PROBLEM_ID)) {
    await problems[PROBLEM_ID]({ verbose });
  } else {
    console.log(
      chalk.red.bold(
        "❌ There is no solution for this problem, yet. Feel free to open a pull request to add your own. 🤓"
      )
    );
  }
  process.exit(1);
};

run(); // da trap
