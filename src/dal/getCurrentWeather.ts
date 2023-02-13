import { IWeatherData, WeatherEssence } from '../entity';
import { AxiosResponse } from 'axios';
import { environment as env } from '../environment/environment';
import { instance } from './axios';
import { store } from '../service/storage.service';

export const getCurrentWeather = async (city: string): Promise<WeatherEssence> => {
	const tokenAcquisition = await store.getValueByKey(env.token);
	const token: string | undefined = process.env.TOKEN ?? tokenAcquisition;
	if (!token)
		throw new Error('Token is not defined, need set [API_KEY]. Use the command -t [API_KEY]');
	const { data }: AxiosResponse<IWeatherData> = await instance.get(
		`data/2.5/weather?q=${city}&appid=${token}`,
	);
	return WeatherEssence.createFromResponse(data);
};
