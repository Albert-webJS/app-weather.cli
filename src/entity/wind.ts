import chalk from "chalk";
import { IWind } from "./whether.data";


export class Wind {
    private speed: number
    constructor(wind: IWind) {
        this.speed = wind.speed;
    }

    public getWindSpeed(): void {
        console.log(`💨 ${chalk.blue('wind speed: ')}: ${chalk.yellow(this.speed)}`)
    }
}
