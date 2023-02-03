import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";


interface IStore {
    saveValueByKey(key: string, value: string): Promise<void>;
    getValueByKey(key: string): Promise<string | undefined>;
}

class Store implements IStore {
    private nameForFile: string = "weather-data.json"
    private filePath: string = join(homedir() + "/Documents", this.nameForFile)

    public async saveValueByKey(key: string, value: string): Promise<void> {
        const isPathExist = await this.isPathExist(this.filePath);
        let data: Record<string, string> = {};
        if (isPathExist) {
            const file: any = await promises.readFile(this.filePath);
            data = JSON.parse(file);
        }
        data[key] = value;
        await promises.writeFile(this.filePath, JSON.stringify(data));
    };

    public async getValueByKey(key: string): Promise<string | undefined> {
        const isPathExist = await this.isPathExist(this.filePath)
        if (!isPathExist) {
            return undefined
        }
        const file: any = await promises.readFile(this.filePath);
        const data = JSON.parse(file);
        return data[key];

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
