import * as React from 'react';
import './SearchResultItem.css'
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import apiConfig from '../../../api/apiConfig';

interface ISearchResultItemProps {
	currentWeather: ICurrentWeather
}

export const SearchResultItem = (props: ISearchResultItemProps) => {
	const { weather, main, wind, clouds, coord, name, sys } = props.currentWeather;
	const img = weather && weather.length && weather[0].icon;

	return <div className="row search-result-item">
		<div className="col-xs-2">
			<div className="row">
				{img && <div className="col-xs-12"><span><img src={apiConfig.imgUrl(img)} /></span></div>}
				<div className="col-xs-12"><span><b>{weather[0].main}</b></span></div>
			</div>
		</div>
		<div className="col-xs-10">
			<div className="row">
				<div className="col-xs-12">
					<span><a href="london.html">{name}, {sys.country}</a></span>
					<span><i className="gb flag"></i></span>
					<span><b>{weather[0].description}</b></span>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<span>{weather[0].description}</span>
				</div>
				<div className="col-xs-12">
					<span>
						<div className="ui horizontal label">16.4°С</div>
					</span>
					<span>temperature from <b>{main.temp_min}°С</b> to <b>{main.temp_max}°С</b>, wind <b>{wind.speed} m/s.</b>, clouds <b>{clouds.all}%</b>,
					1018hpa</span>
				</div>
				<div className="col-xs-12">
					<span>Geo coords <a target="blank" href="https://www.google.com/maps/place/London,+UK/@51.528308,-0.3817765,10z/data=!3m1!4b1!4m5!3m4!1s0x47d8a00baf21de75:0x52963a5addd52a99!8m2!3d51.5073509!4d-0.1277583">[{coord.lon}, {coord.lat}]</a></span>
				</div>
			</div>
		</div>
	</div>
}