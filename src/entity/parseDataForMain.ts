import chalk from "chalk";
import { IMain } from "./whether.data";

export class ParseDataForMain {
    private temp: number;
    private feelsLike: number;
    private humidity: number;

    constructor(main: IMain) {
        this.temp = main.temp;
        this.feelsLike = main.feels_like;
        this.humidity = main.humidity;
    }

    public getWeatherText(): string {
        return `🌡  ${chalk.blue("temp:")} ${chalk.yellow(Math.round(this.temp))} ${chalk.blue("feels like: ")}${chalk.yellow(Math.round(this.feelsLike))}
                💦 ${chalk.blue("humidity: ")} ${chalk.yellow(this.humidity)}`
    }
}