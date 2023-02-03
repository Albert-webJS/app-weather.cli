import { Main, SubWhether, Weather, Wind } from ".";

export interface Coord {
    lon: number;
    lat: number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface IWind {
    speed: number;
    deg: number;
    gust: number
}

export interface Sys {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}
// TODO: Если бы это была модель, тебе не нужен был бы метод в log.service
export interface IWeatherData {
    coord: Coord;
    weather: IWeather[];
    base: string;
    main: IMain;
    visibility: number;
    wind: IWind;
    clouds: { all: number };
    dt: number;
    sys: Sys
    timezone: number,
    id: number,
    name: string,
    cod: number
}
// naming
export class WeatherData {
    private weather: Weather;
    private subWeather: SubWhether;
    private main: Main;
    private wind: Wind;

    constructor(weather: Weather, subWeather: SubWhether, main: Main, wind: Wind) {
        this.weather = weather;
        this.subWeather = subWeather;
        this.main = main;
        this.wind = wind;
    }

    static createFromResponse(weather: IWeatherData): WeatherData {
        const theWeather = new Weather(weather.name)
        const theSubWeather = new SubWhether(weather.weather)
        const theMainForecast = new Main(weather.main);
        const theWind = new Wind(weather.wind);

        return new WeatherData(theWeather, theSubWeather, theMainForecast, theWind)
    }

    getWeatherText(): string {
        const weatherParts = [
            this.weather.getWeatherText(),
            this.subWeather.getWeatherText(),
            this.main.getWeatherText(),
            this.wind.getWeatherText(),
        ];

        return weatherParts.join();
    }

}