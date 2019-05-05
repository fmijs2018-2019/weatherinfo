import * as React from 'react';
import './index.css';
import { WeatherSummaryTable } from './components/WeatherSummaryTable';
import { Header, Icon, Button } from 'semantic-ui-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import weatherApi from '../../api/WeatherApi';
import { RouteComponentProps } from 'react-router';
import { WeatherSwiper } from './components/WeatherSwiper';
import { IWeatherShortInfo } from '../../models/IWeatherShortInfo';
import { IFiveDaysThreeHoursWeather } from '../../models/IFIveDaysThreeHoursWeather';
import ChartsComponent from './components/ChartsComponent';
import { checkIfInFavourites, removeFromFavourites, addToFavourites } from '../../common/favourites';
import { HeartToggleIcon } from '../../components/HeartToggleIcon';

interface ICitySceneState {
	currentWeather?: ICurrentWeather,
	fiveDaysThreeHoursWeather?: IFiveDaysThreeHoursWeather,
	swiperItemsData: IWeatherShortInfo[],
	isInFavourites: boolean
}
interface ICitySceneProps extends RouteComponentProps, InjectedIntlProps {

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
				let swiperItemsData: IWeatherShortInfo[] = [];

				for (let i = 0; i < 40; i = i + 8) {
					const dayWeatherData = fiveDaysThreeHoursWeather.list[i];

					const dayWeatherShortInfo: IWeatherShortInfo = {
						clouds: dayWeatherData.clouds.all,
						windSpeed: dayWeatherData.wind.speed,
						temp: dayWeatherData.main.temp,
						temp_min: dayWeatherData.main.temp_min,
						temp_max: dayWeatherData.main.temp_max,
						pressure: dayWeatherData.main.pressure,
						humidity: dayWeatherData.main.humidity,
						description: dayWeatherData.weather[0].description,
						icon: dayWeatherData.weather[0].icon,
						date: dayWeatherData.dt,
					}

					swiperItemsData.push(dayWeatherShortInfo);
				}

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
			{city && <Header as="h3"><FormattedMessage id="city-weather.header" defaultMessage="Current weather and forecast" /></Header>}
			{cityId && <div style={{ float: 'right' }}>
				<HeartToggleIcon onClick={() => this.onToggleIconClick(cityId)} active={isInFavourites} />
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

export default injectIntl(CityScene);
