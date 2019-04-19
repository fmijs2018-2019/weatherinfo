import * as React from 'react';
import './CityScene.css';
import { WeatherSummaryTable } from './components/WeatherSummaryTable';
import { Header } from 'semantic-ui-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import weatherApi from '../../api/WeatherApi';
import { RouteComponentProps } from 'react-router';
import ChartsNavBar from './components/ChartsNavBar';
import { TempComposedChart } from './components/TempComposedChart';
import { ITempDataItem } from '../../models/ITempDataItem';
import { IWindDataItem } from '../../models/IWindDataItem';
import { WindLineChart } from './components/WindLineChart';
import apiConfig from '../../api/apiConfig';
import { IPressureDataItem } from '../../models/IPressureDataItem';
import { PressureComposedChart } from './components/PressureComposedChart';
import { IPrecipitationDataItem } from '../../models/IPrecipitationDataItem';
import { PrecipitationAriaChart } from './components/PrecipitationAriaChart';

interface ICitySceneState {
	currentWeather?: ICurrentWeather,
	city: string,
	activeChart: string,
	tempChartData: ITempDataItem[],
	pressureChartData: IPressureDataItem[],
	precipitationChartData: IPrecipitationDataItem[],
	windChartData: IWindDataItem[],
}
interface ICitySceneProps extends RouteComponentProps, InjectedIntlProps {

}

class CityScene extends React.Component<ICitySceneProps, ICitySceneState> {
	constructor(props: Readonly<ICitySceneProps>) {
		super(props);

		const city = (this.props.match.params as any).city
		this.state = {
			city,
			activeChart: 'Temperature',
			tempChartData: [],
			windChartData: [],
			precipitationChartData: [],
			pressureChartData: []
		};
	}

	componentDidMount = () => {
		const { city } = this.state
		const currentWeatherPromise = weatherApi.getCurrentWeather(city);
		const fiveDaysThreeHoursWeatherPromise = weatherApi.getFiveDaysThreeHoursWeather(city);

		Promise.all([currentWeatherPromise, fiveDaysThreeHoursWeatherPromise])
			.then(([currentWeather, fiveDaysThreeHoursWeather]) => {
				const chartsData = fiveDaysThreeHoursWeather.list.slice(0, 8);
				let tempChartData: ITempDataItem[] = [];
				let pressureChartData: IPressureDataItem[] = [];
				let precipitationChartData: IPrecipitationDataItem[] = [];
				let windChartData: IWindDataItem[] = [];

				chartsData.forEach(i => {
					const name = i.dt_txt.slice(11, 16);
					tempChartData.push({
						name,
						min: i.main.temp_min,
						max: i.main.temp_max,
						avarage: i.main.temp,
						icon: apiConfig.imgUrl(i.weather.icon)
					});
					windChartData.push({ name, speed: i.wind.speed, deg: i.wind.deg });
					pressureChartData.push({
						name,
						pressure: i.main.pressure,
						grndLevel: i.main.grnd_level,
						seaLevel: i.main.sea_level
					});
					precipitationChartData.push({ name, rain: i.rain && i.rain["3h"], snow: i.snow && i.snow["3h"] });
				});

				this.setState({ city, currentWeather, tempChartData, windChartData, pressureChartData, precipitationChartData });
				console.log(currentWeather, fiveDaysThreeHoursWeather);
			});
	}

	handleChartsNavBarClick = (e: any, data: { name: string }) => {
		this.setState({ activeChart: data.name });
	}

	render() {
		const { activeChart, city, currentWeather, tempChartData, windChartData, pressureChartData, precipitationChartData } = this.state;
		const country = currentWeather && currentWeather.sys.country.toUpperCase();

		return <React.Fragment>
			<Header as="h1">{city[0].toUpperCase() + city.substring(1)}, {country}</Header>
			<Header as="h3"><FormattedMessage id="city-weather.header" defaultMessage="Current weather and forecast" /></Header>
			<div className="row">
				<div className="col-md-3 col-md-offset-1">
					{this.state.currentWeather && <WeatherSummaryTable currentWeather={this.state.currentWeather}></WeatherSummaryTable>}
				</div>
				<div className="col-md-7">
					<ChartsNavBar activeItem={activeChart} handleItemClick={this.handleChartsNavBarClick}></ChartsNavBar>
					{activeChart === 'Temperature' && <TempComposedChart data={tempChartData}></TempComposedChart>}
					{activeChart === 'Wind' && <WindLineChart data={windChartData}></WindLineChart>}
					{activeChart === 'Pressure' && <PressureComposedChart data={pressureChartData}></PressureComposedChart>}
					{activeChart === 'Precipitation' && <PrecipitationAriaChart data={precipitationChartData}></PrecipitationAriaChart>}				
				</div>
			</div>
		</React.Fragment >;
	}
}

export default injectIntl(CityScene);
