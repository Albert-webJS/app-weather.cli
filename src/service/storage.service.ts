import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath: string = join(homedir() + "/Documents", "weather-data.json");

interface IStore {
    saveValueByKey(key: string, value: string): Promise<void>;
    getValueByKey(key: string): Promise<string | undefined>;
}

class Store implements IStore {

    async saveValueByKey(key: string, value: string): Promise<void> {
        const isPathExist = await this.isPathExist(filePath);
        let data: Record<string, string> = {};
        if (isPathExist) {
            const file: any = await promises.readFile(filePath);
            data = JSON.parse(file);
        }
        data[key] = value;
        await promises.writeFile(filePath, JSON.stringify(data));
    };

    async getValueByKey(key: string): Promise<string | undefined> {
        const isPathExist = await this.isPathExist(filePath)
        if (!isPathExist) {
            return undefined
        }
        const file: any = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key] as string;

    };

    private async isPathExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    };
}

export const store = new Store();
