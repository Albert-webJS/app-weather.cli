import chalk from "chalk";
import { SubWhether, Main, Weather, Wind, IWeatherData } from "../entity";

interface IPrintMessage {
    success(message: string): void;
    error(error: string): void;
    help(): void;
    weather(response: IWeatherData, icon: string): void
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

    weather(dataWeather: IWeatherData): void {
        const { weather, wind, main, name } = dataWeather;
        const theWeather = new Weather(name)
        const theSubWeather = new SubWhether(weather)
        const theMainForecast = new Main(main);
        const theWind = new Wind(wind);

        console.log(`
            ${theWeather.getWeatherFromTheCity()}
            ${theSubWeather.getWhetherDescription()}
            ${theMainForecast.getMainForecast()}
            ${theWind.getWindSpeed()}
        `
        )
    };
};


export const printMessage = new PrintMessage();