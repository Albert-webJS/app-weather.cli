import axios, { AxiosResponse } from "axios";
import { store } from "../service/storage.service.js";
import { IWeatherData } from "../interfaces/weatherData";
import { environment as env } from "../environment/environment.js";

export const getIconByValue = (iconValue: string): string => {
    const key: number = parseInt(iconValue);
    const emoji: Map<number, string> = new Map([
        [1, "🌞"],
        [2, "🌤"],
        [3, "☁️"],
        [4, "☁️"],
        [9, "🌧"],
        [10, "🌦"],
        [11, "🌩"],
        [13, "❄"],
        [50, "❄"],
    ]);

    return emoji.get(key) as string;
};

type Params = {
    params: {
        q: string,
        appid: string,
        lang: string,
        units: string,
    },
}

const configParams = (city: string, token: string): Params => {
    return {
        params: {
            q: city,
            appid: token,
            lang: "ru",
            units: "metric",
        },
    }
}

export const getCurrentWheather = async (city: string): Promise<IWeatherData> => {
    const token: string | undefined = process.env.TOKEN ?? (await store.getValueByKey(env.token));
    if (!token)
        throw new Error(
            "token is not definet, need set API key. Use the command -t [API_KEY]"
        );

    const params: Params = configParams(city, token)

    const response: AxiosResponse<any, IWeatherData> = await axios.get(env.domain, params);
    return response.data as IWeatherData;
}; 
