import chalk from "chalk";
import { IWeatherData } from "../interfaces/weatherData";
export const printSuccess = (message: string): void => {
    console.log(`${chalk.green.bold("Success: ")} ${message}`);
};

export const printError = (error: string): void => {
    console.log(`${chalk.red.bold("Error: ")} ${chalk.gray(error)}`);
};

export const printHelp = (): void => {
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

export const printWeather = (response: IWeatherData, icon: string): void => {
    console.log(
        `${chalk.yellow("WEATHER")} ${chalk.blue("in city")} ${chalk.green(name)}:
    ${icon} ${chalk.blue(response.weather.description)};
    🌡  ${chalk.blue("temp:")} ${chalk.yellow(Math.round(response.main.temp))}, ${chalk.blue(
            "feels like: "
        )}${chalk.yellow(Math.round(response.main.feels_like))};
    💦 ${chalk.blue("humidity: ")} ${chalk.yellow(response.main.humidity)}%; 
    💨 ${chalk.blue("wind speed: ")} ${chalk.yellow(response.wind.speed)};
    `
    );
};
