import * as React from 'react';
import './SearchResultItem.css'
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import WeatherIcon from '../../../components/WeatherIcon';
import { Icon, Button } from 'semantic-ui-react';
import { addToFavourites, checkIfInFavourites } from '../../../common/favourites';
import { HeartButtonIcon } from '../../../components/HeartButtonIcon';

interface ISearchResultItemProps {
	currentWeather: ICurrentWeather
}

interface ISearchResultItemState {
}

export class SearchResultItem extends React.Component<ISearchResultItemProps, ISearchResultItemState> {
	constructor(props: Readonly<ISearchResultItemProps>) {
		super(props);

	}

	render() {
		const { weather, main, wind, clouds, coord, id, sys, name } = this.props.currentWeather;
		const icon = weather && weather.length && weather[0].icon;

		return <div className="row search-result-item">
			<div className="col-xs-2">
				<div className="row">
					{icon && <div className="col-xs-12" style={{display: 'flex', justifyContent: 'center'}}><span><WeatherIcon icon={icon} /></span></div>}
					<div className="col-xs-12" style={{display: 'flex', justifyContent: 'center'}}><span><b>{weather[0].main}</b></span></div>
				</div>
			</div>
			<div className="col-xs-6">
				<div className="row">
					<div className="col-xs-12">
						<span><Link to={`/cities/${id}`}>{name}, {sys.country} </Link></span>
						<span><i className={classNames(sys.country.toLocaleLowerCase(), 'flag')}></i></span>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<span style={{ fontWeight: 'bold' }}>{weather[0].description}</span>
					</div>
					<div className="col-xs-12">
						<span><div className="ui horizontal label">{main.temp}°С</div></span>
						<span><FormattedMessage id='common.temperature-from' defaultMessage='Temperature from' /> </span>
						<span><b>{main.temp_min}°С</b> </span>
						<span><FormattedMessage id='common.to' defaultMessage='to' /> </span>
						<span><b>{main.temp_max}°С</b></span>
					</div>
					<div className="col-xs-12">
						<span><FormattedMessage id='geo.coords' defaultMessage='Geo coords' /></span>
						<span><a target="blank" href={`https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`}>[{coord.lat}, {coord.lon}]</a></span>
					</div>
				</div>
			</div>
			<div className="col-xs-3">
				<div className="row">
					<div className="col-xs-12">
						<span><FormattedMessage id='weather.wind' defaultMessage='Wind' />: </span>
						<span><b>{wind.speed} m/s.</b>, </span>
					</div>
					<div className="col-xs-12">
						<span><FormattedMessage id='weather.cloudiness' defaultMessage='Cloudiness' />: </span>
						<span><b>{clouds.all}%</b>, </span>
					</div>
					<div className="col-xs-12">
						<span><FormattedMessage id='weather.humidity' defaultMessage='Humidity' />: </span>
						<span><b>{main.humidity}%</b> </span>
					</div>
					<div className="col-xs-12">
						<span><FormattedMessage id='weather.pressure' defaultMessage='Pressure' />: </span>
						<span><b>{main.pressure}hpa</b> </span>
					</div>
				</div>
			</div>
			<div className="col-xs-1" style={{display: 'flex', justifyContent: 'center', height: '90px', alignItems: 'center'}}>
				<HeartButtonIcon cityId={id} />
			</div>
		</div>;
	}
}
