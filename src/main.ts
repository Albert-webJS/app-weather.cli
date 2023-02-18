#!/usr/bin/env node
import { getArgs, printMessage } from './helpers';
import { AxiosError } from 'axios';
import { WeatherEssence } from './entity';
import { environment as env } from './environment/environment';
import { getCurrentWeather } from './dal';
import { store } from './service';

interface IApp {
	getForecast(): Promise<void>;
	init(): Promise<void> | void;
	saveToken(token: string): Promise<void>;
	saveCity(city: string): Promise<void>;
}

class App implements IApp {
	async getForecast(): Promise<void> {
		try {
			const city: string | undefined = await store.getValueByKey(env.city);
			if (!city)
				throw new Error("City is not defined, need set [CITY], Use the command '-s' [CITY]");
			else {
				const weather: WeatherEssence = await getCurrentWeather(city);
				printMessage.weather(weather);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 404) {
					printMessage.error('Incorrect city specified');
				}
				if (error.response?.status === 401) {
					printMessage.error('Incorrectly specified token');
				}
				printMessage.error(error.message);
			}
		}
	}

	async saveToken(token: string): Promise<void> {
		if (!token.length) {
			printMessage.error(
				"The argument is not transmitted. It is necessary to set token. Use command '-t' [API_KEY].",
			);
			return;
		}
		try {
			await store.saveValueByKey(env.token, token);
			printMessage.success('Token is saved!');
		} catch (error) {
			if (error instanceof Error) printMessage.error(error.message);
		}
	}

	async saveCity(city: string): Promise<void> {
		if (!city.length) {
			printMessage.error('no arguments, no city saved. Enter the city!');
			return;
		}
		try {
			await store.saveValueByKey(env.city, city);
			printMessage.success('City is saved!');
		} catch (error) {
			if (error instanceof Error) printMessage.error(error.message);
		}
	}

	init(): Promise<void> | void {
		const args = getArgs(process.argv);
		if (args.h) {
			return printMessage.help();
		}
		if (args.s) {
			return this.saveCity(args.s as string);
		}
		if (args.t) {
			return this.saveToken(args.t as string);
		}
		if (args.init) {
			return this.getForecast();
		}
		printMessage.error('This command does not exist or not specified');
	}
}

const app = new App();
app.init();
