import { ICoord, IMainWeather, IWeather, IClouds, IWind, IRain, ISnow } from "./ICurrentWeather";

export interface IFiveDaysThreeHoursWeather {
	code: number, // Internal param
	message: string, // Internal param
	city: ICity,
	cnt: number, // Number of lines returned by this API call
	list: IWeatherItem[]
}

export interface ICity {
	id: number,
	name: string,
	coord: ICoord,
	country: string, // Country code
	population?: number
}

export interface IWeatherItem {
	dt: number // Time of data forecast, unix, UTC
	main: IMainWeather,
	weather: IWeather,
	clouds: IClouds,
	wind: IWind,
	rain?: IRain, // only 3h
	snow?: ISnow, // only 3h
	dt_txt: string // Data/time of calculation, UTC
}