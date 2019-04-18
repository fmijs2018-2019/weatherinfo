import * as React from 'react';
import { CitySearchBar } from './components/CitySearchBar';
import { SearchResultItem } from './components/SearchResultItem';
import './HomeScene.css'
import weatherApi from '../../api/WeatherApi';
import { ICurrentWeather } from '../../models/ICurrentWeather';
import { Message } from 'semantic-ui-react';

interface IHomeSceneState {
	cityWeatherItems: ICurrentWeather[],
	cityNotFound: boolean;
}

interface IHomeSceneProps {

}

export class HomeScene extends React.Component<IHomeSceneProps, IHomeSceneState> {

	constructor(props: Readonly<IHomeSceneProps>) {
		super(props);
		this.state = {
			cityWeatherItems: [],
			cityNotFound: false,
		}
	}

	onSearchValueChange: any = (city: string, code: string) => {
		const input = code ? city + "," + code : city;
		weatherApi.getCurrentWeather(input)
			.then(res => {
				this.setState({ cityWeatherItems: [res], cityNotFound: false });
			}).catch(error => {
				this.setState({ cityWeatherItems: [], cityNotFound: true })
			});
	}

	render() {
		const { cityNotFound, cityWeatherItems } = this.state;
		return <React.Fragment>
			<div className="search-container">
				<CitySearchBar onSelect={this.onSearchValueChange} ></CitySearchBar>
			</div>
			<div className="search-result-container">
				{cityNotFound && <Message color='teal'>No <b>WeatherInfo</b> for selected city :(</Message>}
				{cityWeatherItems.map(i => <SearchResultItem key={i.id} currentWeather={i}></SearchResultItem>)}
			</div>
		</React.Fragment>
	}
}