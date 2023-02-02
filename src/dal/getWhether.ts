import { IWeatherData } from "../entity/whether.data";
import { store } from "../service/storage.service";
import { environment as env } from "../environment/environment";
import { instance } from "./axios";


export const getCurrentWhether = async (city: string): Promise<IWeatherData> => {
    const tokenAcquisition = await store.getValueByKey(env.token)
    const token: string | undefined = process.env.TOKEN ?? tokenAcquisition;
    if (!token)
        throw new Error(
            "Token is not defined, need set [API_KEY]. Use the command -t [API_KEY]"
        );

    const options: Record<string, string> = {
        token,
        city,
    };

    console.log({ city, token })

    const response = await instance.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`, {
        params: {
            lang: "ru",
            units: "metric"
        }
    });
    return response.data;
}; 
