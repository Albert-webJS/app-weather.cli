#!/usr/bin/env node
import { getArgs, printMessage } from "./src/helpers";
import { store } from "./src/service";
import { getCurrentWeather } from './src/dal'
import { WeatherEssence } from "./src/entity";
import { environment as env } from "./src/environment/environment";

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
            if (!city) throw new Error("City is not defined, need set [CITY], Use the command '-s' [CITY]");
            else {
                const weather: WeatherEssence = await getCurrentWeather(city);
                printMessage.weather(weather);
            }

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

    async saveToken(token: string): Promise<void> {
        if (!token.length) {
            printMessage.error("The argument is not transmitted. It is necessary to set token. Use command '-t' [API_KEY].");
            return;
        }
        try {
            await store.saveValueByKey(env.token, token);
            printMessage.success("Token is saved!");
        } catch (error) {
            if (error instanceof Error) printMessage.error(error.message);
        }
    }

    async saveCity(city: string): Promise<void> {
        if (!city.length) {
            printMessage.error("no arguments, no city saved. Enter the city!");
            return;
        }
        try {
            await store.saveValueByKey(env.city, city);
            printMessage.success("City is saved!");
        } catch (error) {
            if (error instanceof Error) printMessage.error(error.message);
        }
    };

    init(): Promise<void> | void {
        // TODO: -- node weather.js -tr TEXT_SOME
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
        // TODO: запускать командой отдельно !

        this.getForecast();
    };
}

const app = new App();
app.init();