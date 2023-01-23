#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printSuccess, printError, printHelp } from "./service/log.service.js";
import { saveKeyValue } from "./service/storage.service.js";
import { TOKEN_KEYWORDS } from "./service/storage.service.js";
import { getCurrentWheather } from "./service/api.service.js";

export const saveToken = async (token) => {
  if (!token.length) {
    printError("No argument, need get token !");
    return;
  }
  try {
    await saveKeyValue(TOKEN_KEYWORDS.token, token);
    printSuccess("Token is save !");
  } catch (error) {
    printError(error.message);
  }
};


const init = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    printSuccess();
    return "yep, argument heer";
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getCurrentWheather("london");
  // printError("error hendler");
};

init();
