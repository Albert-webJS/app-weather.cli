#!/usr/bin/env node
import { getArgs } from "./src/helpers/args";
import {
    printSuccess,
    printError,
    printHelp,
    printWeather,
} from "./src/service/log.service";
import { getKeyValue, saveKeyValue } from "./src/service/storage.service";
import { TOKEN_KEYWORDS } from "./src/service/storage.service";
import { getCurrentWheather, getIconByValue } from "./src/service/api.service";
import { IWeatherData } from "./src/interfaces/weatherData";

export const saveToken = async (token: string): Promise<void> => {
    if (!token.length) {
        printError("no arguments, no token saved. Enter the token!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_KEYWORDS.token, token);
        printSuccess("Token is saved!");
    } catch (error) {
        if (error instanceof Error) printError(error.message);
    }
}

const saveCity = async (city: string): Promise<void> => {
    if (!city.length) {
        printError("no arguments, no city saved. Enter the city!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_KEYWORDS.city, city);
        printSuccess("City is saved!");
    } catch (error) {
        if (error instanceof Error) printError(error.message);
    }
};

const getForcast = async (): Promise<void> => {
    try {
        const city: string | undefined = await getKeyValue(TOKEN_KEYWORDS.city);
        const weather: IWeatherData = await getCurrentWheather(city!);
        printWeather(weather, getIconByValue(weather.weather.description));
    } catch (error: any) {
        if (error.response.status === 404) {
            printError("Incorrect city specified");
        }
        if (error.response.status === 401) {
            printError("incorrectly specified token");
        }
        printError(error.message);
    }
};

const init = (): Promise<void> | void => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s as string);
    }
    if (args.t) {
        return saveToken(args.t as string);
    }
    getForcast();
};

init();
