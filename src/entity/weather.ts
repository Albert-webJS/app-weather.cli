import chalk from "chalk";


export class Weather {
    private city: string;
    constructor(name: string) {
        this.city = name;
    }

    public getWeatherText(): string {
        return `${chalk.yellow("WEATHER")} ${chalk.blue("in city")} ${chalk.green(this.city)}`;
    }
}
