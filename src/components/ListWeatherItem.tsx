import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ICurrentWeather } from '../models/ICurrentWeather';
import WeatherIcon from './WeatherIcon';
import './ListWeatherItem.css'
import { Flag } from 'semantic-ui-react';
import FormattedTemperature from './FormattedTemperature';
import { FormattedMainWeather } from './FormattedMainWeather';

interface IListWeatherItemProps {
	currentWeather: ICurrentWeather,
	iconButton: React.ReactNode,
}

export const ListWeatherItem = (props: IListWeatherItemProps) => {
	const { weather, main, wind, clouds, coord, id, sys, name } = props.currentWeather;
	const icon = weather && weather.length && weather[0].icon;
	const weatherId = weather[0].id;

	const iconColStyle = { display: 'flex', justifyContent: 'center', height: '90px', alignItems: 'center' };
	return <div className="row list-weather-item">
		<div className="col-sm-2" >
			<div className="row">
				{icon && <div className="col-xs-12" style={{ display: 'flex', justifyContent: 'center' }}><span><WeatherIcon icon={icon} /></span></div>}
				<div className="col-xs-12" style={{ display: 'flex', justifyContent: 'center' }}><span><b><FormattedMainWeather weatherId={weatherId}/></b></span></div>
			</div>
		</div >
		<div className="col-sm-6">
			<div className="row">
				<div className="col-xs-12">
					<span><Link to={`/cities/${id}`}>{name}, {sys.country} </Link></span>
					<span>{sys.country && <Flag name={sys.country.toLocaleLowerCase() as any} />}</span>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<span style={{ fontWeight: 'bold' }}>{weather[0].description}</span>
				</div>
				<div className="col-xs-12">
					<span><div className="ui horizontal label"><FormattedTemperature temp={main.temp}/></div></span>
					<span><FormattedMessage id='common.temperature_from' defaultMessage='Temperature from' /> </span>
					<span><b><FormattedTemperature temp={main.temp_min}/></b></span>
					<span><FormattedMessage id='common.to' defaultMessage='to' /></span>
					<span><b><FormattedTemperature temp={main.temp_max}/></b></span>
				</div>
				<div className="col-xs-12">
					<span><FormattedMessage id='geo.coords' defaultMessage='Geo coords' /></span>
					<span><a target="blank" href={`https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`}>[{coord.lat}, {coord.lon}]</a></span>
				</div>
			</div>
		</div>
		<div className="col-sm-3">
			<div className="row">
				<div className="col-xs-12">
					<span><FormattedMessage id='weather.wind' defaultMessage='Wind' />: </span>
					<span><b>{wind.speed}</b> <FormattedMessage id="weather.wind_mps" defaultMessage="m/s"/></span>
				</div>
				<div className="col-xs-12">
					<span><FormattedMessage id='weather.cloudiness' defaultMessage='Cloudiness' />: </span>
					<span><b>{clouds.all}</b> %</span>
				</div>
				<div className="col-xs-12">
					<span><FormattedMessage id='weather.humidity' defaultMessage='Humidity' />: </span>
					<span><b>{main.humidity}</b> %</span>
				</div>
				<div className="col-xs-12">
					<span><FormattedMessage id='weather.pressure' defaultMessage='Pressure' />: </span>
					<span><b>{main.pressure}</b> <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa"/></span>
				</div>
			</div>
		</div>
		<div className="col-sm-1" style={iconColStyle}>
			{props.iconButton}
		</div>
	</div>;
}


