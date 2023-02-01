#!/usr/bin/env node
import { environment as env } from "./src/environment/environment";
import { getArgs } from "./src/helpers";
import { store, printMessage } from "./src/service";
import { getCurrentWheather } from './src/dal'
import { getIconByValue } from "./src/helpers";
import { IWeatherData } from "./src/interfaces/weather.data";

interface IApp {
    getForcast(): Promise<void>;
    init(): Promise<void> | void;
}

class App implements IApp {
    async getForcast(): Promise<void> {
        try {
            const city: string | undefined = await store.getValueByKey(env.city);
            const weather: IWeatherData = await getCurrentWheather(city!);
            const icon: string = getIconByValue(weather.weather.description)
            printMessage.weather(weather, icon);
        } catch (error: any) {
            if (error.response.status === 404) {
                printMessage.error("Incorrect city specified");
            }
            if (error.response.status === 401) {
                printMessage.error("Incorrectly specified token");
            }
            printMessage.error(error.message);
        }
    };

    init(): Promise<void> | void {
        const args = getArgs(process.argv);
        if (args.h) {
            return printMessage.help();
        }
        if (args.s) {
            return store.saveCity(args.s as string);
        }
        if (args.t) {
            return store.saveToken(args.t as string);
        }
        this.getForcast();
    };
}

const app = new App();
app.init();
