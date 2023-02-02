import chalk from "chalk";
import { IWeather } from "./whether.data";

export class SubWhether {
    private icon: string;
    private description: string;

    private emoji: Map<string, string> = new Map([
        ['10d', "🌞"],
        ['20d', "🌤"],
        ['30d', "☁️"],
        ['40d', "☁️"],
        ['90d', "🌧"],
        ['100d', "🌦"],
        ['110d', "🌩"],
        ['130d', "❄"],
        ['500d', "❄"],
    ]);

    constructor(weather: IWeather) {
        this.icon = weather.icon;
        this.description = weather.description;
    }



    public getWhetherDescription(): void {
        console.log(`${this.emoji.get(this.icon)} ${chalk.blue(this.description)};`)
    }
}