import chalk from "chalk";
import { IWeather } from "./whether.data";

export class ParseDescriptionOfStateWeather  {
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
        ['13d', "❄"],
        ['500d', "❄"],
    ]);

    constructor(weathers: IWeather[]) {
        weathers.forEach(weather => {
            this.icon = weather.icon;
            this.description = weather.description;
        })
    }

    public getWeatherText(): string {
        return `${this.emoji.get(this.icon)} ${chalk.blue(this.description)};`;
    }
}