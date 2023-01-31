import { AxiosResponse } from "axios";
import { IWeatherData } from "../interfaces/weatherData";
import { store } from "../service/storage.service";
import { environment as env } from "../environment/environment";
import { instance } from "./axios";

export const getCurrentWheather = async (city: string): Promise<IWeatherData> => {
    const tokenAcquisition = await store.getValueByKey(env.token)
    const token: string | undefined = process.env.TOKEN ?? tokenAcquisition;
    if (!token)
        throw new Error(
            "Token is not definet, need set [API_KEY]. Use the command -t [API_KEY]"
        );

    const options: Record<string, string> = {
        token,
        city,
    }

    const response: AxiosResponse<IWeatherData, any> = await instance.get("data/2.5/weather", options);
    return response.data;
}; 
