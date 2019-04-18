import * as React from 'react';
import CitySearchBar from './components/CitySearchBar';
import { SearchResultItem } from './components/SearchResultItem';
import './HomeScene.css'
import weatherApi from '../../api/WeatherApi';
import { ICurrentWeather } from '../../models/ICurrentWeather';

interface IHomeSceneState {
	searchBarValue: string,
	cityWeatherItems: ICurrentWeather[],
}

interface IHomeSceneProps {

}

export class HomeScene extends React.Component<IHomeSceneProps, IHomeSceneState> {

	constructor(props: Readonly<IHomeSceneProps>) {
		super(props);
		this.state = {
			searchBarValue: '',
			cityWeatherItems: [],
		}
	}

	onSearchButtonClick = () => {
		weatherApi.getCurrentWeather(this.state.searchBarValue).then(res => {
			this.setState({ cityWeatherItems: [...this.state.cityWeatherItems, res] });
		});
	}

	onLocationButtonClick = () => {

	}

	onSearchValueChange = (e: any) => {
		this.setState({ searchBarValue: e.target.value })
	}

	render() {

		return <React.Fragment>
			<div className="search-container">
				<CitySearchBar
					onSearchButtonClick={this.onSearchButtonClick}
					onLocationButtonClick={this.onLocationButtonClick}
					onSearchValueChange={this.onSearchValueChange} ></CitySearchBar>
			</div>
			<div className="search-result-container">
				{this.state.cityWeatherItems.map(i => <SearchResultItem key={i.id} currentWeather={i}></SearchResultItem>)}
			</div>
		</React.Fragment>
	}
}