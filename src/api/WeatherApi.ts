import axios, { AxiosRequestConfig } from 'axios';
import apiConfig from './apiConfig';
import { ICurrentWeather } from '../models/ICurrentWeather';
import { IFiveDaysThreeHoursWeather } from '../models/IFIveDaysThreeHoursWeather';

class WeatherApi {
	private defaultParams = {
		appid: apiConfig.appid,
		units: 'metric'
	}

	getCurrentWeather(city: string) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.currentWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this.defaultParams, q: city } }
		return axios.get<ICurrentWeather>(url, config)
			.then(response => response.data);
	}

	getFiveDaysThreeHoursWeather(city: string) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.fiveDaysThreeHoursWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this.defaultParams, q: city } }
		return axios.get<IFiveDaysThreeHoursWeather>(url, config)
			.then(response => response.data);
	}
}


const weatherApi = new WeatherApi();
export default weatherApi;