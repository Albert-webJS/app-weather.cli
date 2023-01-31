import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";
import { printMessage } from "./log.service";
import { environment as env } from "../environment/environment";

const filePath: string = join(homedir() + "/Documents", "weather-data.json");

type WeatherFile = {
    token: string,
    city: string,
}

interface IStore {
    saveValueByKey(key: string, value: string): Promise<void>;
    getValueByKey(key: string): Promise<string | undefined>;
    saveToken(token: string): Promise<void>;
    saveCity(city: string): Promise<void>;
}

class Store implements IStore {
    async saveValueByKey(key: string, value: string): Promise<void> {
        let data: Record<string, string> = {};
        if (await this.isExist(filePath)) {
            const file: any = await promises.readFile(filePath);
            data = JSON.parse(file);
        }
        data[key] = value;
        await promises.writeFile(filePath, JSON.stringify(data));
    };

    async getValueByKey(key: string): Promise<string | undefined> {
        if (await this.isExist(filePath)) {
            const file: any = await promises.readFile(filePath);
            const data = JSON.parse(file);
            return data[key] as string;
        }
        return undefined;
    };

    async saveToken(token: string): Promise<void> {
        if (!token.length) {
            printMessage.error("no arguments, no token saved. Enter the token!");
            return;
        }
        try {
            await this.saveValueByKey(env.token, token);
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
            await this.saveValueByKey(env.city, city);
            printMessage.success("City is saved!");
        } catch (error) {
            if (error instanceof Error) printMessage.error(error.message);
        }
    };

    private async isExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    };
}

export const store = new Store();
