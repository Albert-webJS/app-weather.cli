#!/usr/bin/env node
import { environment as env } from "./src/environment/environment";
import { getArgs } from "./src/helpers/args";
import { printHandlerMessage } from "./src/service/log.service";
import { store } from "./src/service/storage.service";
import { getCurrentWheather, getIconByValue } from "./src/service/api.service";
import { IWeatherData } from "./src/interfaces/weatherData";


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
            printHandlerMessage.weather(weather, icon);
        } catch (error: any) {
            if (error.response.status === 404) {
                printHandlerMessage.error("Incorrect city specified");
            }
            if (error.response.status === 401) {
                printHandlerMessage.error("incorrectly specified token");
            }
            printHandlerMessage.error(error.message);
        }
    };

    init(): Promise<void> | void {
        const args = getArgs(process.argv);
        if (args.h) {
            return printHandlerMessage.help();
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
