#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printSuccess, printError, printHelp } from "./service/log.service.js";
import { saveKeyValue } from "../service/storage.service";

export const saveToken = async (token) => {
  try {
    await saveKeyValue("token", token);
    printSuccess("Token is save !");
  } catch (error) {
    printError(error.message);
  }
};

const watcher = (type) => {
  if (type.h) {
    return printHelp();
  }
  if (type.s) {
    printSuccess();
    return "yep, argument heer";
  }
  if (type.t) {
    return saveToken(args.t);
  }
  printError("error hendler");
};

const init = () => {
  const args = getArgs(process.argv);
  watcher(args);
};

init();
