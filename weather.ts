#!/usr/bin/env node
import { environment as env } from "./src/environment/environment";
import { getArgs, printMessage } from "./src/helpers";
import { store } from "./src/service";
import { getCurrentWhether } from './src/dal'
import { getIconByValue } from "./src/helpers";
import { IWhetherData } from "./src/entity/whether.data";

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
            const weather: IWhetherData = await getCurrentWhether(city!);
            // TODO: эту иконку можно было бы поместить в модель погоды)
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

    async saveToken(token: string): Promise<void> {
        if (!token.length) {
            printMessage.error("no arguments, no token saved. Enter the token!");
            return;
        }
        try {
            await store.saveValueByKey(env.token, token);
            printMessage.success("Token is saved!");
        } catch (error) {
            // TODO: хмм.. а остальные ошибки просто скипнем?)
            // не пойми неправильно, но что ты будешь делать если ты вводишь команду, а приложение не реагирует?)
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
        // TODO: а если будет что-то непредвиденное? Типа: -- node weather.js -tr TEXT_SOME
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
        // TODO: тут ты ведь запускаешь выполнение программы? Лучше это делать командой или хотя бы вызывать отдельно)

        this.getForecast();
    };
}

const app = new App();
app.init();
