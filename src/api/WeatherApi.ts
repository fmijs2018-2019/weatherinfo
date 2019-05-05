import axios, { AxiosRequestConfig } from 'axios';
import apiConfig from './apiConfig';
import { ICurrentWeather } from '../models/ICurrentWeather';
import { IFiveDaysThreeHoursWeather } from '../models/IFIveDaysThreeHoursWeather';
import { ISettings } from '../models/ISettings';
import { getSettingsOrDefault } from '../common/localStorageService';

class WeatherApi {

	_getDefaultParams = () => {
		const settings: ISettings = getSettingsOrDefault();
		let units = 'dummy';
		if (settings.tempMetric === 'f') {
			units = "imperial";
		} else if (settings.tempMetric === "c") {
			units = "metric";
		}
		return {
			units,
			appid: apiConfig.appid,
			lang: settings.language
		}
	}

	getCurrentWeatherByName(city: string) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.currentWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this._getDefaultParams(), q: city } }
		return axios.get<ICurrentWeather>(url, config)
			.then(response => response.data);
	}

	getCurrentWeatherByLocation(lon: number, lat: number) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.currentWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this._getDefaultParams(), lat, lon } }
		return axios.get<ICurrentWeather>(url, config)
			.then(response => response.data);
	}

	getCurrentWeatherById(cityId: number) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.currentWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this._getDefaultParams(), id: cityId } }
		return axios.get<ICurrentWeather>(url, config)
			.then(response => response.data);
	}

	getFiveDaysThreeHoursWeather(cityId: number) {
		const url = `${apiConfig.mainApiUrl}${apiConfig.fiveDaysThreeHoursWeatherPath}`;
		const config: AxiosRequestConfig = { params: { ...this._getDefaultParams(), id: cityId } }
		return axios.get<IFiveDaysThreeHoursWeather>(url, config)
			.then(response => response.data);
	}
}


const weatherApi = new WeatherApi();
export default weatherApi;