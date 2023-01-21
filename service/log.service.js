import chalk from "chalk";

export const printSuccess = (message) => {
  console.log(`${chalk.green.bold(" Success ")} ${message}`);
};

export const printError = (error) => {
  console.log(`${chalk.red.bold(" Error ")} ${error}`);
};

export const printHelp = () => {
  console.log(
    `
    ${chalk.cyan("HELP")}
    ${chalk.redBright("No parameters")}: weather output ${chalk.dim(
      "(default)"
    )};
    ${chalk.blueBright.bold("-s [CITY]")}: to set the city; 
    ${chalk.blueBright.bold("-t [API_KEY]")}: to save the token;
    ${chalk.blueBright.bold("-h")}: for output help;
    `
  );
};
