import chalk from "chalk";
import { IWind } from "./whether.data";


export class ParseDataForWind {
    private speed: number
    constructor(wind: IWind) {
        this.speed = wind.speed;
    }

    public getWeatherText(): string {
        return `💨 ${chalk.blue('wind speed:')} ${chalk.yellow(this.speed)}`;
    }
}
