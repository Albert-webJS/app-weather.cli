import chalk from "chalk";
import { IWeatherData } from "./whether.data";


export class Weather {
    private city: string;
    constructor(name: string) {
        this.city = name;
    }

    public getWeatherFromTheCity(): void {
        console.log(`${chalk.yellow("WHETHER")} ${chalk.blue("in city")} ${chalk.green(this.city)}`)
    }
}
