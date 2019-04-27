import axios, { AxiosRequestConfig } from 'axios';
import apiConfig from './apiConfig';
import { ICurrentWeather } from '../models/ICurrentWeather';
import { IFiveDaysThreeHoursWeather } from '../models/IFIveDaysThreeHoursWeather';

class WeatherApi {
	private defaultParams = {
		appid: apiConfig.appid,
		units: 'metric'
	}

	getCurrentWeatherByName(city: string) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.currentWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this.defaultParams, q: city } }
		return axios.get<ICurrentWeather>(url, config)
			.then(response => response.data);
	}

	getCurrentWeatherById(cityId: number) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.currentWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this.defaultParams, id: cityId } }
		return axios.get<ICurrentWeather>(url, config)
			.then(response => response.data);
	}

	getFiveDaysThreeHoursWeather(cityId: number) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.fiveDaysThreeHoursWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this.defaultParams, id: cityId } }
		return axios.get<IFiveDaysThreeHoursWeather>(url, config)
			.then(response => response.data);
	}
}


const weatherApi = new WeatherApi();
export default weatherApi;