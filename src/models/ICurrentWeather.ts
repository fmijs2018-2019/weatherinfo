export interface ICurrentWeather {
	coord: ICoord,
	weather: IWeather[],
	base: string,
	main: IMainWeather,
	wind: IWind,
	clouds: IClouds,
	rain?: IRain,
	snow?: ISnow,
	dt: number, // Time of data calculations, unix, UTC
	sys: ISys,
	id: number, // City id
	name: string, // City name
	cod: number // Internal param
}

export interface ICoord {
	lon: number,
	lat: number
}

export interface IWeather {
	id: number,
	main: string, // Group of weather params (Rain, Snow, Extreme...)
	description: string, // Weather condition within the group
	icon: string,
}

export interface IMainWeather {
	temp: number, // Default unit: Kelvin
	pressure: number, // hPa
	humidity: number, // %
	// Minimum temp at the moment. This is deviation from current temp that is possible for
	// large cities and megalopolises geographically expanded (use these parameter optionally).
	// Unit Default: Kelvin
	temp_min: number,
	// Maximum temp at the moment. This is deviation from current temp that is possible for
	// large cities and megalopolises geographically expanded (use these parameter optionally).
	// Unit Default: Kelvin
	temp_max: number,
	sea_level: number, // Atmosphere pressure on the sea level, hPa
	grnd_level: number, // Atmosphere pressure on the ground level, hPa
	temp_kf?: number // Internal parameter 
}

export interface IWind {
	speed: number, // Unit Default: meter/sec
	deg: number // Wind direction, degrees
}

export interface IClouds {
	all: number // Cloudiness, %
}

export interface IRain {
	'1h'?: number // Rain volume for the last 1 hour, mm
	'3h': number // Rain volume for the last 3 hours, mm
}

export interface ISnow {
	'1h'?: number // Snow volume for the last 1 hour, mm
	'3h': number // Snow volume for the last 3 hours, mm
}

export interface ISys {
	type: number, // Internal param
	id: number, // Internal param
	message:  number, // Internal param
	country: string, // Country code
	sunrise: number, // unix, UTC
	sunset: number, // unix, UTC
}