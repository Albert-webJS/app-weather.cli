import chalk from "chalk";

export const printSuccess = (message) => {
  console.log(`${chalk.green.bold("Success: ")} ${message}`);
};

export const printError = (error) => {
  console.log(`${chalk.red.bold("Error: ")} ${chalk.gray(error)}`);
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

export const printWeather = (response, icon) => {
  console.log(
    `${chalk.yellow("WEATHER:")} ${chalk.blue("in city")} ${chalk.green(
      response.name
    )}
    ${icon} ${chalk.blue(response.weather[0].description)};
    🌡  ${chalk.blue("temp:")} ${chalk.yellow(
      Math.round(response.main.temp)
    )}, ${chalk.blue("feels like: ")}${chalk.yellow(
      Math.round(response.main.feels_like)
    )};
    💦 ${chalk.blue("humidity: ")} ${chalk.yellow(response.main.humidity)}%; 
    💨 ${chalk.blue("wind speed: ")} ${chalk.yellow(response.wind.speed)};
    `
  );
};
