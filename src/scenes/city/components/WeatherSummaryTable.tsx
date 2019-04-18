import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { FormattedMessage } from 'react-intl';
import { getWindDirection } from '../../../utils/getWindDirection';
import apiConfig from '../../../api/apiConfig';

interface IWeatherSummaryTableProps {
	currentWeather: ICurrentWeather
}

export const WeatherSummaryTable = (props: IWeatherSummaryTableProps) => {
	const { main: mainWeather, rain, snow, weather: shortWeather, coord: { lon, lat }, wind, clouds } = props.currentWeather;
	const { icon, main: shortDescription, description } = shortWeather[0];

	return <React.Fragment>
		<div className="row">
			<div className="col-xs-6">
				<span style={{ margin: '20px' }}><img src={apiConfig.imgUrl(icon)} /></span>
				<span className="float-right" style={{ fontSize: '28px' }}>11°С</span>
			</div>

			<div className="col-xs-6">
				<div className="row">
					<div className="col-xs-12"><b>{shortDescription}</b></div>
					<div className="col-xs-12">{description}</div>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-xs-12">
				<Table celled striped>
					<Table.Body>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.wind' defaultMessage='Wind' /></Table.Cell>
							<Table.Cell>{wind.speed} m/s, {getWindDirection(wind.deg)} ({wind.deg})</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.cloudiness' defaultMessage='Cloudiness' /></Table.Cell>
							<Table.Cell>{clouds.all}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.pressure' defaultMessage='Pressure' /></Table.Cell>
							<Table.Cell>{mainWeather.pressure} hpa</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.humidity' defaultMessage='Humidity' /></Table.Cell>
							<Table.Cell>{mainWeather.humidity} %</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.rain' defaultMessage='Rain' /></Table.Cell>
							<Table.Cell>{rain && rain['3h'] || 0} mm</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.snow' defaultMessage='Snow' /></Table.Cell>
							<Table.Cell>{snow && snow['3h'] || 0} mm</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='geo.coords' defaultMessage='Geo coords' /></Table.Cell>
							<Table.Cell>
								<span><a target="blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}>[{lat}, {lon}]</a></span>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
		</div>
	</React.Fragment>
}
