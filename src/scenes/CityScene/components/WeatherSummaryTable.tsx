import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { FormattedMessage } from 'react-intl';
import { getWindDirection } from '../../../utils/getWindDirection';
import apiConfig from '../../../api/apiConfig';
import WeatherIcon from '../../../components/WeatherIcon';
import { FormattedMainWeather } from '../../../components/FormattedMainWeather';
import FormattedTemperature from '../../../components/FormattedTemperature';

interface IWeatherSummaryTableProps {
	currentWeather: ICurrentWeather
}

export const WeatherSummaryTable = (props: IWeatherSummaryTableProps) => {
	const { main: mainWeather, rain, snow, weather: shortWeather, coord: { lon, lat }, wind, clouds } = props.currentWeather;
	const { icon, description } = shortWeather[0];
	const weatherId = shortWeather[0].id;

	const style: React.CSSProperties = {
		marginTop: '-15px',
		paddingLeft: '25px',
		fontSize: '16px',
	}

	return <React.Fragment>
		<div className="row" >
			<div className="col-xs-12">
				<WeatherIcon icon={icon} />
				<span style={{ fontSize: '28px' }}><FormattedTemperature temp={mainWeather.temp} /></span>
			</div>
		</div>
		<div className="row">
			<div className="col-xs-12" style={style}>
				<b><FormattedMainWeather weatherId={weatherId}/></b>
				<span>{' '}{description}</span>
			</div>
		</div>
		<div className="row">
			<div className="col-xs-12">
				<Table celled striped unstackable color="teal">
					<Table.Body>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.wind' defaultMessage='Wind' /></Table.Cell>
							<Table.Cell>{wind.speed} <FormattedMessage id="weather.wind_mps" defaultMessage="m/s"/>{wind.deg && <span>, {getWindDirection(wind.deg)} ({wind.deg})</span>}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.cloudiness' defaultMessage='Cloudiness' /></Table.Cell>
							<Table.Cell>{clouds.all} %</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.pressure' defaultMessage='Pressure' /></Table.Cell>
							<Table.Cell>{mainWeather.pressure} <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa"/></Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.humidity' defaultMessage='Humidity' /></Table.Cell>
							<Table.Cell>{mainWeather.humidity} %</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.rain' defaultMessage='Rain' /></Table.Cell>
							<Table.Cell>{rain && (rain['3h'] || rain['1h']) || 0} <FormattedMessage id="weather.rain_mm" defaultMessage="mm"/></Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><FormattedMessage id='weather.snow' defaultMessage='Snow' /></Table.Cell>
							<Table.Cell>{snow && (snow['3h'] || snow['1h']) || 0} <FormattedMessage id="weather.rain_mm" defaultMessage="mm"/></Table.Cell>
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
