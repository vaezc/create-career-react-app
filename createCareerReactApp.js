const fs = require("fs");
const { Command } = require("commander");
const pkg = require("./package.json");
const program = new Command();
const ora = require("ora");
const exec = require("child_process").exec;

function clone(projectName) {
  const url = "git@github.com:vaezc/umi-template.git";

  const spinner = ora("Initializing the Career React App");
  spinner.start();
  spinner.color = "green";

  exec(`git clone ${url} ${projectName}`, (error) => {
    if (error) {
      console.log(error);
    } else {
      exec(`rm -rf ${projectName}/.git`);
      spinner.succeed("Career React App is ready！");

      console.log("\n");
      console.log(`cd ${projectName} && npm install`);
      console.log(`Quick start developing`);
    }
  });
}

function init() {
  program
    .name("create-Career-React-app")
    .description("CLI to create Career App")
    .usage("<projectName> | [options]")
    .version(pkg.version);

  const projectName = process.argv[2];

  if (projectName) {
    fs.exists(projectName, (exists) => {
      exists
        ? console.log(
            "The project already exists, please check the project name.".red
          )
        : clone(projectName);
    });
  }

  program.parse(process.argv);
}

module.exports = {
  init,
};
