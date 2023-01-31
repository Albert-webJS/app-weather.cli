var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";
import { printMessage } from "./log.service.js";
import { environment as env } from "../environment/environment.js";
const filePath = join(homedir() + "/Documents", "weather-data.json");
class Store {
    saveValueByKey(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            if (yield this.isExist(filePath)) {
                const file = yield promises.readFile(filePath);
                data = JSON.parse(file);
            }
            data[key] = value;
            yield promises.writeFile(filePath, JSON.stringify(data));
        });
    }
    ;
    getValueByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isExist(filePath)) {
                const file = yield promises.readFile(filePath);
                const data = JSON.parse(file);
                return data[key];
            }
            return undefined;
        });
    }
    ;
    saveToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token.length) {
                printMessage.error("no arguments, no token saved. Enter the token!");
                return;
            }
            try {
                yield this.saveValueByKey(env.token, token);
                printMessage.success("Token is saved!");
            }
            catch (error) {
                if (error instanceof Error)
                    printMessage.error(error.message);
            }
        });
    }
    saveCity(city) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!city.length) {
                printMessage.error("no arguments, no city saved. Enter the city!");
                return;
            }
            try {
                yield this.saveValueByKey(env.city, city);
                printMessage.success("City is saved!");
            }
            catch (error) {
                if (error instanceof Error)
                    printMessage.error(error.message);
            }
        });
    }
    ;
    isExist(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises.stat(path);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    ;
}
export const store = new Store();
