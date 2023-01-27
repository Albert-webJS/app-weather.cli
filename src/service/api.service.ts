import axios, { AxiosResponse } from "axios";
import { TOKEN_KEYWORDS, getKeyValue } from "../service/storage.service.js";
import { IWeatherData } from "../interfaces/weatherData";

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
    const token: string | undefined = process.env.TOKEN ?? (await getKeyValue(TOKEN_KEYWORDS.token));
    if (!token)
        throw new Error(
            "token is not definet, need set API key. Use the command -t [API_KEY]"
        );

    const params: Params = configParams(city, token)
    const response: AxiosResponse<any, IWeatherData> = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        params
    );
    return response.data as IWeatherData;
};
