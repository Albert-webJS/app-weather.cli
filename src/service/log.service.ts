import chalk from "chalk";
import { IWeatherData } from "../interfaces/weatherData";

interface IUserMessage {
    success(message: string): void;
    error(error: string): void;
    help(): void;
    weather(response: IWeatherData, icon: string): void
}

class PrintMessage implements IUserMessage {

    success(message: string): void {
        console.log(`${chalk.green.bold("Success: ")} ${message}`);
    }

    error(error: string): void {
        console.log(`${chalk.red.bold("Error: ")} ${chalk.gray(error)}`);
    };

    help(): void {
        console.log(`
        ${chalk.cyan("HELP")}
        ${chalk.redBright("No parameters")}: weather output ${chalk.dim("(default)")};
        ${chalk.blueBright.bold("-s [CITY]")}: to set the city; 
        ${chalk.blueBright.bold("-t [API_KEY]")}: to save the token;
        ${chalk.blueBright.bold("-h")}: for output help;
        `
        );
    };

    weather({
        name, 
        weather: { description },
        wind: { speed },
        main: { temp, feels_like, humidity }}: IWeatherData,
        icon: string): void {
        console.log(`
        ${chalk.yellow("WEATHER")} ${chalk.blue("in city")} ${chalk.green(name)}
        ${icon} ${chalk.blue(description)};
        🌡 ${chalk.blue("temp:")} ${chalk.yellow(Math.round(temp))}, ${chalk.blue("feels like: ")}${chalk.yellow(Math.round(feels_like))}
        💦 ${chalk.blue("humidity: ")} ${chalk.yellow(humidity)}
        💨 ${chalk.blue("wind speed: ")} ${chalk.yellow(speed)}
        `
        );
    };

};


export const printMessage = new PrintMessage();