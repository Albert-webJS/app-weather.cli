#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printSuccess,
  printError,
  printHelp,
  printWeather,
} from "./service/log.service.js";
import { getKeyValue, saveKeyValue } from "./service/storage.service.js";
import { TOKEN_KEYWORDS } from "./service/storage.service.js";
import { getCurrentWheather, geyIconByValue } from "./service/api.service.js";

export const saveToken = async (token) => {
  if (!token.length) {
    printError("no arguments, no token saved. Enter the token!");
    return;
  }
  try {
    await saveKeyValue(TOKEN_KEYWORDS.token, token);
    printSuccess("Token is saved!");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("no arguments, no city saved. Enter the city!");
    return;
  }
  try {
    await saveKeyValue(TOKEN_KEYWORDS.city, city);
    printSuccess("City is saved!");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_KEYWORDS.city);
    const weather = await getCurrentWheather(city);
    printWeather(weather, geyIconByValue(weather.weather[0].icon));
  } catch (error) {
    if (error.response.status === 404) {
      printError("Incorrect city specified");
    }
    if (error.response.status === 401) {
      printError("incorrectly specified token");
    }
    printError(error.message);
  }
};

const init = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast();
};

init();
