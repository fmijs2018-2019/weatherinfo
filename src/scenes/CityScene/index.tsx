import * as React from 'react';
import './index.css';
import { WeatherSummaryTable } from './components/WeatherSummaryTable';
import { Header } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import weatherApi from '../../api/WeatherApi';
import { RouteComponentProps } from 'react-router';
import { WeatherSwiper } from './components/WeatherSwiper';
import { IWeatherShortInfo } from '../../models/IWeatherShortInfo';
import { IFiveDaysThreeHoursWeather } from '../../models/IFIveDaysThreeHoursWeather';
import ChartsComponent from './components/ChartsComponent';
import { checkIfInFavourites, removeFromFavourites, addToFavourites } from '../../common/localStorageService';
import { HeartToggleIcon } from '../../components/HeartToggleIcon';
import _ from 'lodash';

interface ICitySceneState {
	currentWeather?: ICurrentWeather,
	fiveDaysThreeHoursWeather?: IFiveDaysThreeHoursWeather,
	swiperItemsData: IWeatherShortInfo[],
	isInFavourites: boolean
}
interface ICitySceneProps extends RouteComponentProps {

}

class CityScene extends React.Component<ICitySceneProps, ICitySceneState> {
	constructor(props: Readonly<ICitySceneProps>) {
		super(props);

		this.state = {
			swiperItemsData: [],
			isInFavourites: false
		};
	}

	componentDidMount = () => {
		const cityId = (this.props.match.params as any).city
		const currentWeatherPromise = weatherApi.getCurrentWeatherById(cityId);
		const fiveDaysThreeHoursWeatherPromise = weatherApi.getFiveDaysThreeHoursWeather(cityId);

		Promise.all([currentWeatherPromise, fiveDaysThreeHoursWeatherPromise])
			.then(([currentWeather, fiveDaysThreeHoursWeather]) => {

				var grouped = _.groupBy(fiveDaysThreeHoursWeather.list, e => new Date(e.dt * 1000).getDate());
				const swiperItemsData = Object.keys(grouped)
					.map(e => {
						var perDayList = grouped[e];
						var minTemp = _.minBy(perDayList, e => e.main.temp_min);
						var maxTemp = _.maxBy(perDayList, e => e.main.temp_max);
						var avg: IWeatherShortInfo = {
							clouds: Math.round(_.meanBy(perDayList, e => e.clouds.all)),
							windSpeed: +(_.meanBy(perDayList, e => e.wind.speed).toFixed(2)),
							temp: +(_.meanBy(perDayList, e => e.main.temp).toFixed(2)),
							temp_min: +(minTemp ? minTemp.main.temp_min : 0).toFixed(2),
							temp_max: +(maxTemp ? maxTemp.main.temp_max : 0).toFixed(2),
							pressure: +(_.meanBy(perDayList, e => e.main.pressure).toFixed(2)),
							humidity: Math.round(_.meanBy(perDayList, e => e.main.humidity)),
							description: perDayList[0].weather[0].description,
							icon: perDayList[0].weather[0].icon,
							date: perDayList[0].dt,
						}
						return avg;
					});

				this.setState({ swiperItemsData, currentWeather, fiveDaysThreeHoursWeather, isInFavourites: checkIfInFavourites(currentWeather.id) });
			})
	}

	onToggleIconClick = (cityId: number) => {
		const isInFavourites = checkIfInFavourites(cityId);
		isInFavourites ? removeFromFavourites(cityId) : addToFavourites(cityId);
		this.setState({ isInFavourites: !isInFavourites });
	}

	render() {
		const { currentWeather, swiperItemsData, fiveDaysThreeHoursWeather, isInFavourites } = this.state;
		const country = (currentWeather && currentWeather.sys.country || "").toUpperCase();
		const city = currentWeather && currentWeather.name;
		const cityId = currentWeather && currentWeather.id;

		return <div className="container body">
			{city && <Header as="h1">{city && city[0].toUpperCase() + city.substring(1) || ''}, {country}</Header>}
			{city && <Header as="h3"><FormattedMessage id="city.weather_and_forcast" defaultMessage="Current weather and forecast" /></Header>}
			{cityId &&
				<div className="row">
					<div className="col-xs-12">
						<span style={{float: 'right'}}>
							<HeartToggleIcon onClick={() => this.onToggleIconClick(cityId)} active={isInFavourites} />
						</span>
					</div>
				</div>}
			<div className="row">
				<div className="col-md-3">
					{currentWeather && <WeatherSummaryTable currentWeather={currentWeather}></WeatherSummaryTable>}
				</div>
				<div className="col-md-9">
					{fiveDaysThreeHoursWeather && currentWeather && <ChartsComponent currentWeather={currentWeather} fiveDaysThreeHoursWeather={fiveDaysThreeHoursWeather} />}
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					{swiperItemsData.length !== 0 && <WeatherSwiper items={swiperItemsData}></WeatherSwiper>}
				</div>
			</div>
		</div>;
	}
}

export default CityScene;
