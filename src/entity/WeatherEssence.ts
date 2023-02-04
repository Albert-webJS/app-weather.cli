import dedent from 'dedent';
import { 
    IWeatherData, 
    ParseDataForMain, 
    ParseDescriptionOfStateWeather, 
    ParseDataForNameCity, 
    ParseDataForWind
} from ".";

export class WeatherEssence {
    private parseDataForNameCity: ParseDataForNameCity;
    private parseDescriptionOfStateWeather: ParseDescriptionOfStateWeather;
    private parseDataForMain: ParseDataForMain;
    private parseDataForWind: ParseDataForWind;

    constructor(
        parseDataForCity: ParseDataForNameCity,
        parseDescriptionOfState: ParseDescriptionOfStateWeather,
        parseDataForMain: ParseDataForMain,
        parseDataForWind: ParseDataForWind
    ) {
        this.parseDataForNameCity = parseDataForCity;
        this.parseDescriptionOfStateWeather = parseDescriptionOfState;
        this.parseDataForMain = parseDataForMain;
        this.parseDataForWind = parseDataForWind;
    }

    static createFromResponse(weather: IWeatherData): WeatherEssence {
        const parseDataForNameCityWeather = new ParseDataForNameCity(weather.name)
        const parseDescriptionOfStateWeather = new ParseDescriptionOfStateWeather(weather.weather)
        const parseDataForMain = new ParseDataForMain(weather.main);
        const PparseDataForWind = new ParseDataForWind(weather.wind);

        return new WeatherEssence(
            parseDataForNameCityWeather,
            parseDescriptionOfStateWeather,
            parseDataForMain,
            PparseDataForWind,
        );
    }

    public getWeatherText(): string {
        const weatherParts = [
            this.parseDataForNameCity.getWeatherText(),
            this.parseDescriptionOfStateWeather.getWeatherText(),
            this.parseDataForMain.getWeatherText(),
            this.parseDataForWind.getWeatherText()
        ];

        return dedent(weatherParts.join("\n"))
    }
};