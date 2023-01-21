#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printSuccess, printError, printHelp } from "./service/log.service.js";

const init = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
    return;
  }
  if (args.s) {
    printSuccess();
    return 'yep, argument heer'
  }

  printError("error hendler");
};

init();
