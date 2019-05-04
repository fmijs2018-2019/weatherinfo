import React, { Component } from "react";
import { ContinentsDropdown, IContinentItem } from "./components/ContinentsDropdown";
import "./index.css";
import WorldMap, { ICountry } from "./components/WorldMap";
import { RouteComponentProps } from "react-router";
import CountryInfoPanel from "./components/CountryInfoPanel";
import { CountryHelperMethods, getOpenWeatherMapCitiesByCountryAlpha2, IOWMCity, IOWMCitiesByCountry } from "../../common/common";

interface IMapSceneState {
	lat: number;
	lon: number;
	zoom: number;
	country?: ICountry;
	cities?: IOWMCitiesByCountry;
	activePage?: number;
}

interface IMapSceneProps extends RouteComponentProps { };

class MapScene extends Component<IMapSceneProps, IMapSceneState> {
	constructor(props: any) {
		super(props)
		this.state = {
			lat: 0,
			lon: 20,
			zoom: 1,
		}
	}

	citiesPerPage = 50;

	handleContinentClick = (item: IContinentItem) => {
		this.setState({
			lat: item.lat,
			lon: item.lon,
			zoom: item.zoom,
		})
	}
	countryClick = (country: ICountry) => {
		const alpha2 = CountryHelperMethods.convertAlpha3ToAlpha2(country.id) || "";
		getOpenWeatherMapCitiesByCountryAlpha2(alpha2, 0, this.citiesPerPage)
			.then(res => {
				this.setState({ cities: res, country, activePage: 1 })
			});
	}

	onPanelClose = () => {
		this.setState({ country: undefined, cities: undefined, activePage: undefined })
	}

	onPageChange = (page: number) => {
		const { country } = this.state;
		const skip = (page - 1) * this.citiesPerPage;
		const alpha2 = CountryHelperMethods.convertAlpha3ToAlpha2(country && country.id || "") || "";
		getOpenWeatherMapCitiesByCountryAlpha2(alpha2, skip, this.citiesPerPage)
			.then(res => {
				this.setState({ cities: res, activePage: page })
			});
	}

	render() {
		const dropDownStye: React.CSSProperties = {
			position: "absolute",
			left: "10px",
		};
		const mapStyle: React.CSSProperties = {
			width: "100%",
			height: "auto",
			maxHeight: "100%",
			marginTop: "-15px"
		};
		const { lat, lon, zoom, country, cities, activePage } = this.state;
		const itemsList = [
			{ name: "World", lat: 0, lon: 20, zoom: 1 },
			{ name: "Europe", lat: 15.795367, lon: 48.587675, zoom: 3 },
			{ name: "Africa", lon: 3.997508, lat: 9.319308, zoom: 2 },
			{ name: "Asia", lon: 35.139295, lat: 84.202121, zoom: 2 },
			{ name: "Australia", lon: -18.470799, lat: 135.205220, zoom: 2.5 },
			{ name: "North America", lon: 42.137710, lat: -100.956889, zoom: 2 },
			{ name: "South America", lon: -15.783315, lat: -59.911967, zoom: 2 },
		];
		let totalPages = cities ? Math.floor((cities.total / this.citiesPerPage) + 1) : 1;
		return (
			<div className="streched-container" >
				<ContinentsDropdown options={itemsList} style={dropDownStye} onContinentSelect={this.handleContinentClick} />
				<WorldMap lat={lat} lon={lon} zoom={zoom} mapStyle={mapStyle} onCountryClick={this.countryClick} />
				{country && cities && <CountryInfoPanel activePage={activePage || 1} totalPages={totalPages} onPageChange={this.onPageChange} country={country} cities={cities} onClose={this.onPanelClose} />}
			</div>
		)
	}
}

export default MapScene

