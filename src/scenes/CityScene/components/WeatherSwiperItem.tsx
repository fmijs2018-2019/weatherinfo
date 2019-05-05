import * as React from 'react';
import apiConfig from '../../../api/apiConfig';
import './WeatherSwiperItem.css'
import { IWeatherShortInfo } from '../../../models/IWeatherShortInfo';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Label } from 'semantic-ui-react';
import WeatherIcon from '../../../components/WeatherIcon';
import FormattedTemperature from '../../../components/FormattedTemperature';

interface IWeatherSwiperItemProps {
	weather: IWeatherShortInfo
}

export const WeatherSwiperItem = (props: IWeatherSwiperItemProps) => {
	const { clouds, windSpeed, humidity, temp, temp_max, temp_min, icon, description, date, pressure } = props.weather;
	
	return <div className="swiper-item">
		<div><WeatherIcon icon={icon}/></div>
		<div><FormattedDate value={new Date(date * 1000)} weekday="long" /></div>
		<div><FormattedDate value={new Date(date * 1000)} day='2-digit' month='long' /></div>
		<br />
		<Label color='blue' size='large'><FormattedMessage defaultMessage="Min:" id="common.min" />{' '}<FormattedTemperature temp={temp_min}/></Label>
		<Label color='red' size='large'><FormattedMessage defaultMessage="Max:" id="common.max" />{' '}<FormattedTemperature temp={temp_max}/></Label>
		<div><FormattedMessage id="common.avg_temp" defaultMessage="Avarage temperature:"/>{' '}<b><FormattedTemperature temp={temp}/></b></div>
		<div>{description}</div>
		<br />
		<div><FormattedMessage id="weather.wind" defaultMessage="Wind"/>: <b>{windSpeed}</b><FormattedMessage id="weather.wind_mps" defaultMessage="m/s"/></div>
		<div><FormattedMessage id="weather.clounds" defaultMessage="Clouds"/>: <b>{clouds}</b>%</div>
		<div><FormattedMessage id="weather.pressure" defaultMessage="Pressure"/>: <b>{pressure}</b><FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa"/></div>
		<div><FormattedMessage id="weather.humidity" defaultMessage="Humidity"/>: <b>{humidity}</b>%</div>
	</div>
}