import { IWind } from './whether.data';
import chalk from 'chalk';

export class WindWeather {
	private speed: number;
	constructor(wind: IWind) {
		this.speed = wind.speed;
	}

	public getWeatherText(): string {
		return `💨 ${chalk.blue('wind speed:')} ${chalk.yellow(this.speed)}`;
	}
}
