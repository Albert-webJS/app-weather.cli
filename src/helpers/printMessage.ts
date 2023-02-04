import chalk from "chalk";
import dedent from 'dedent'
import { WeatherEssence } from "../entity";

interface IPrintMessage {
    success(message: string): void;
    error(error: string): void;
    help(): void;
    weather(response: WeatherEssence): void
}

class PrintMessage implements IPrintMessage {

    public success(message: string): void {
        console.log(`${chalk.green.bold("Success:")} ${message}`);
    }

    public error(error: string): void {
        console.error(`${chalk.red.bold("Error:")} ${chalk.gray(error)}`);
    }

    public help(): void {
        console.log(
            dedent(`${chalk.cyan("HELP")}
        ${chalk.redBright("No parameters")}: weather output ${chalk.dim("(default)")};
        ${chalk.blueBright.bold("-s [CITY]")}: to set the city; 
        ${chalk.blueBright.bold("-t [API_KEY]")}: to save the token;
        ${chalk.blueBright.bold("-h")}: for output help;
            `)
        );
    }

    public weather(dataWeather: WeatherEssence): void {
        console.log(dataWeather.getWeatherText());
    }
};

export const printMessage = new PrintMessage();