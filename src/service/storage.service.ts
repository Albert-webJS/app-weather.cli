import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath: string = join(homedir() + "/Documents", "weather-data.json");

type TOKEN_KEY = {
    token: string,
    city: string,
}

export const TOKEN_KEYWORDS: TOKEN_KEY = {
    token: "token",
    city: "city",
};

const isExist = async (path: string): Promise<boolean> => {
    try {
        await promises.stat(path);
        return true;
    } catch {
        return false;
    }
};

export const saveKeyValue = async (key: string, value: string): Promise<void> => {
    let data: Record<string, string> = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const buf = Buffer.from(JSON.stringify(file))
        data = JSON.parse(buf.toString());
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key: string): Promise<string | undefined> => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const buf = Buffer.from(JSON.stringify(file))
        const data = JSON.parse(buf.toString());
        return data[key] as string;
    }
    return undefined;
};
