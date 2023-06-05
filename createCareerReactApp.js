const fs = require("fs");
const { Command } = require("commander");
const pkg = require("./package.json");
const program = new Command();
const ora = require("ora");
const exec = require("child_process").exec;
const chalk = require("chalk");

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
      spinner.succeed(chalk.green("Career React App is ready!"));

      console.log("\n");
      console.log(chalk.blue(`cd ${projectName} && npm install`));
      console.log(chalk.blue(`Quick start developing`));
    }
  });
}

function init() {
  let projectName;

  program
    .name("create-Career-React-app")
    .description("CLI to create Career App")
    .version(pkg.version);

  program
    .command("init <projectName>")
    .description("初始化项目")
    .action((name) => {
      projectName = name;
      console.log(chalk.green("init", name));
      if (projectName) {
        fs.exists(projectName, (exists) => {
          exists
            ? console.log(
                "The project already exists, please check the project name.".red
              )
            : clone(projectName);
        });
      }
    });

  program.parse();
}

module.exports = {
  init,
};
