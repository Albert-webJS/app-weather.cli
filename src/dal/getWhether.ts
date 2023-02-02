import { AxiosResponse } from "axios";
import { IWhetherData } from "../entity/weather.data";
import { store } from "../service/storage.service";
import { environment as env } from "../environment/environment";
import { instance } from "./axios";

export const getCurrentWhether = async (city: string): Promise<IWhetherData> => {
    if (!city) throw new Error("City is not defined, need set [CITY], Use the command -s [CITY]");
    
    const tokenAcquisition = await store.getValueByKey(env.token)
    const token: string | undefined = process.env.TOKEN ?? tokenAcquisition;
    if (!token)
        throw new Error(
            "Token is not defined, need set [API_KEY]. Use the command -t [API_KEY]"
        );

    const options: Record<string, string> = {
        token,
        city,
    }

    const response: AxiosResponse<IWhetherData, any> = await instance.get("data/2.5/weather", options);
    return response.data;
}; 
