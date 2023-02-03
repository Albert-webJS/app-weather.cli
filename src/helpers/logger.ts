import chalk from "chalk";
import { SubWhether, Main, Weather, Wind, IWeatherData, WeatherData } from "../entity";

interface IPrintMessage {
    success(message: string): void;
    error(error: string): void;
    help(): void;
    weather(response: WeatherData, icon: string): void
}

class PrintMessage implements IPrintMessage {

    success(message: string): void {
        console.log(`${chalk.green.bold("Success: ")} ${message}`);
    }

    error(error: string): void {
        console.error(`${chalk.red.bold("Error: ")} ${chalk.gray(error)}`);
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

    weather(dataWeather: WeatherData): void {
        console.log(dataWeather.getWeatherText());
    };
};


export const printMessage = new PrintMessage();