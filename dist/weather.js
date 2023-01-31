#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { environment as env } from "./src/environment/environment.js";
import { getArgs } from "./src/helpers/args.js";
import { store, printMessage } from "./src/service/index.js";
import { getCurrentWheather } from './src/dal/getWeather.js';
import { getIconByValue } from "./src/helpers/iconHandling.js";
class App {
    getForcast() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield store.getValueByKey(env.city);
                const weather = yield getCurrentWheather(city);
                const icon = getIconByValue(weather.weather.description);
                console.log({ icon})
                printMessage.weather(weather, icon);
            }
            catch (error) {
                if (error.response?.status === 404) {
                    printMessage.error("Incorrect city specified");
                }
                if (error.response?.status === 401) {
                    printMessage.error("Incorrectly specified token");
                }
                printMessage.error(error.message);
            }
        });
    }
    ;
    init() {
        const args = getArgs(process.argv);
        if (args.h) {
            return printMessage.help();
        }
        if (args.s) {
            return store.saveCity(args.s);
        }
        if (args.t) {
            return store.saveToken(args.t);
        }
        this.getForcast();
    }
    ;
}
const app = new App();
app.init();
