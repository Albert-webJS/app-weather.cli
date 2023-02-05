import chalk from "chalk";
import { IWeather } from "./whether.data";

export class DescriptionWeather  {
    private icon: string;
    private description: string;

    private emoji: Map<string, string> = new Map([
        ['01d', "🌞"],
        ['02d', "🌤"],
        ['03n', "☁️"],
        ['04n', "☁️"],
        ['09d', "🌧"],
        ['100d', "🌦"],
        ['110d', "🌩"],
        ['13n', "❄"],
        ['50d', "❄"],
    ]);

    constructor(weathers: IWeather[]) {
        weathers.forEach(weather => {
            this.icon = weather.icon;
            this.description = weather.description;
        })
    }

    public getWeatherText(): string {
        return `${this.emoji.get(this.icon)}  ${chalk.blue(this.description)}`
    }
}