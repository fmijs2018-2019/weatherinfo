import React, { Component } from "react";
import { ContinentsDropdown, IContinentItem } from "./components/ContinentsDropdown";
import "./index.css";
import WorldMap from "./components/WorldMap";

interface IMapSceneState {
	lat: number;
	lon: number;
	zoom: number;
}

class MapScene extends Component<{}, IMapSceneState> {
	constructor(props: any) {
		super(props)
		this.state = {
			lat: 0,
			lon: 20,
			zoom: 1,
		}
	}
	handleContinentClick = (item: IContinentItem) => {
		this.setState({
			lat: item.lat,
			lon: item.lon,
			zoom: item.zoom,
		})
	}
	handleCityClick = (city: any) => {
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
		const { lat, lon, zoom } = this.state;
		const itemsList = [
			{ name: "World", lat: 0, lon: 20, zoom: 1 },
			{ name: "Europe", lat: 15.795367, lon: 48.587675, zoom: 3 },
			{ name: "Africa", lon: 3.997508, lat: 9.319308, zoom: 2 },
			{ name: "Asia", lon: 35.139295, lat: 84.202121, zoom: 2 },
			{ name: "Australia", lon: -18.470799, lat: 135.205220, zoom: 2.5 },
			{ name: "North America", lon: 42.137710, lat: -100.956889, zoom: 2 },
			{ name: "South America", lon: -15.783315, lat: -59.911967, zoom: 2 },
		];
		return (
			<div className="streched-container" >
				<ContinentsDropdown options={itemsList} style={dropDownStye} onContinentSelect={this.handleContinentClick} />
				<WorldMap lat={lat} lon={lon} zoom={zoom} mapStyle={mapStyle} />
			</div>
		)
	}
}

export default MapScene

