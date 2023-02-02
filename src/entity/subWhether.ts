import chalk from "chalk";
import { IWhether } from "./whether.data";

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

    constructor(whether: IWhether) {
        this.icon = whether.icon;
        this.description = whether.description;
    }



    getWhetherDescription(): string {
        return `${this.emoji.get(this.icon)} ${chalk.blue(this.description)};`
    }
}