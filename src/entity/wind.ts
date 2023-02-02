import chalk from "chalk";
import { IWind } from "./whether.data";


export class Wind {
    public speed: number
    constructor(wind: IWind) {
        this.speed = wind.speed;
    }

    getWindSpeed(): string {
        return `💨 ${chalk.blue('wind speed: ')}: ${chalk.yellow(this.speed)}`
    }
}

