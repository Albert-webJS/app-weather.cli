import { DescriptionWeather, IWeatherData, MainWeatherInfo, TitleWeather, WindWeather } from '.';
import dedent from 'dedent';

export class WeatherEssence {
	private _title: TitleWeather;
	private _description: DescriptionWeather;
	private _main: MainWeatherInfo;
	private _wind: WindWeather;

	constructor(
		title: TitleWeather,
		description: DescriptionWeather,
		main: MainWeatherInfo,
		wind: WindWeather,
	) {
		this._title = title;
		this._description = description;
		this._main = main;
		this._wind = wind;
	}

	static createFromResponse(weather: IWeatherData): WeatherEssence {
		const title = new TitleWeather(weather.name);
		const description = new DescriptionWeather(weather.weather);
		const main = new MainWeatherInfo(weather.main);
		const wind = new WindWeather(weather.wind);

		return new WeatherEssence(title, description, main, wind);
	}

	public getWeatherText(): string {
		const weatherParts = [
			this._title.getWeatherText(),
			this._description.getWeatherText(),
			this._main.getWeatherText(),
			this._wind.getWeatherText(),
		];

		return dedent(weatherParts.join('\n'));
	}
}
