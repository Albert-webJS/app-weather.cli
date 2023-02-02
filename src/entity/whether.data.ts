export interface Coord {
    lon: number;
    lat: number;
}

export interface IWhether {
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
export interface IWhetherData {
    coord: Coord;
    weather: IWhether;
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
