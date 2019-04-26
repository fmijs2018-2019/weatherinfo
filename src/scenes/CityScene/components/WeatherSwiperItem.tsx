import * as React from 'react';
import apiConfig from '../../../api/apiConfig';
import './WeatherSwiperItem.css'
import { IWeatherShortInfo } from '../../../models/IWeatherShortInfo';
import { FormattedDate } from 'react-intl';
import { Label } from 'semantic-ui-react';
import WeatherIcon from '../../../components/WeatherIcon';

interface IWeatherSwiperItemProps {
	weather: IWeatherShortInfo
}

export const WeatherSwiperItem = (props: IWeatherSwiperItemProps) => {
	const { clouds, windSpeed, humidity, temp, temp_max, temp_min, icon, description, date, pressure } = props.weather;
	console.log(date);
	return <div className="swiper-item">
		<div><WeatherIcon icon={icon}/></div>
		<div><FormattedDate value={new Date(date * 1000)} weekday="long" /></div>
		<div><FormattedDate value={new Date(date * 1000)} day='2-digit' month='long' /></div>
		<br />
		<Label color='blue' size='large'>Min: {temp_min}°С</Label>
		<Label color='red' size='large'>Max: {temp_max}°С</Label>
		<div>Avarage temperature: <b>{temp}</b>°С</div>
		<div>{description}</div>
		<br />
		<div>Wind: <b>{windSpeed}</b>m/s</div>
		<div>Clouds: <b>{clouds}</b>%</div>
		<div>Pressure: <b>{pressure}</b>hpa</div>
		<div>Humidity: <b>{humidity}</b>%</div>
	</div>
}