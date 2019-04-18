import * as React from 'react';
import './CityScene.css';
import { WeatherSummaryTable } from './components/WeatherSummaryTable';
import { Header } from 'semantic-ui-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import weatherApi from '../../api/WeatherApi';
import { RouteComponentProps } from 'react-router';
import ChartsNavBar from './components/ChartsNavBar';

interface ICitySceneState {
	currentWeather?: ICurrentWeather
	city: string,
	activeChart: string
}
interface ICitySceneProps extends RouteComponentProps, InjectedIntlProps {

}

class CityScene extends React.Component<ICitySceneProps, ICitySceneState> {
	constructor(props: Readonly<ICitySceneProps>) {
		super(props);

		const city = (this.props.match.params as any).city
		this.state = { city, activeChart: 'Temperature' };
	}

	componentDidMount = () => {
		weatherApi.getCurrentWeather(this.state.city)
			.then(res =>
				this.setState({ currentWeather: res })
			);
	}

	handleChartsNavBarClick = (e: any, data: { name: string }) => {
		this.setState({ activeChart: data.name });
	}

	render() {
		const { activeChart, city, currentWeather } = this.state;
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
				</div>
			</div>
		</React.Fragment >;
	}
}

export default injectIntl(CityScene);
