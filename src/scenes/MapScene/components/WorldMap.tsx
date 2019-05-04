import { Motion, spring } from "react-motion";
import geography from "../world-50m.json";
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import React from "react";
import ReactTooltip from "react-tooltip";

interface IWorldMapProps {
	lat: number;
	lon: number;
	zoom: number;
	mapStyle?: React.CSSProperties;
	defaultStyle?: React.CSSProperties;
	hoverStyle?: React.CSSProperties;
	pressedStyle?: React.CSSProperties;
	onCountryClick?: (country: ICountry) => void;
}

export interface ICountry {
	properties: _.Dictionary<string>;
	id: string;
}

export default class WorldMap extends React.Component<IWorldMapProps> {

	constructor(props: IWorldMapProps) {
		super(props);
	}

	onClick = (country: ICountry) => {
		const { onCountryClick } = this.props;
		if (onCountryClick) {
			onCountryClick(country);
		}
	}

	timeout?: NodeJS.Timeout;

	componentDidMount() {
		this.timeout = setTimeout(() => {
			ReactTooltip.rebuild()
		}, 100)
	}

	componentWillUnmount () {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}
	}

	render() {

		const { lat, lon, mapStyle, defaultStyle, hoverStyle, pressedStyle } = this.props;
		const zoomProp = this.props.zoom;

		const _defaultStyle = {
			fill: "#ECEFF1",
			stroke: "#607D8B",
			strokeWidth: 0.75,
			outline: "none",
			...defaultStyle,
		};
		const _hoverStyle = {
			fill: "#CFD8DC",
			stroke: "#607D8B",
			strokeWidth: 0.75,
			outline: "none",
			...hoverStyle,
		}
		const _pressedStyle = {
			fill: "#FF5722",
			stroke: "#607D8B",
			strokeWidth: 0.75,
			outline: "none",
			pressedStyle,
		}

		return (
			<Motion
				defaultStyle={{
					zoom: 1,
					x: 0,
					y: 20,
				}}
				style={{
					zoom: spring(zoomProp, { stiffness: 210, damping: 20 }),
					x: spring(lat, { stiffness: 210, damping: 20 }),
					y: spring(lon, { stiffness: 210, damping: 20 }),
				}}
			>
				{({ zoom, x, y }: any) => (
					<React.Fragment>
						<ComposableMap
							projectionConfig={{ scale: 205 }}
							width={900}
							height={551}
							style={mapStyle}
						>
							<ZoomableGroup center={[x, y]} zoom={zoom} disablePanning>
								<Geographies geography={geography}>
									{(geographies, projection) =>
										geographies.map((geography: any, i) => geography.id !== "010" && (
											<Geography
												key={i}
												geography={geography}
												data-tip={geography.properties.name}
												projection={projection}
												onClick={(data: any) => this.onClick(data)}
												style={{
													default: _defaultStyle,
													hover: _hoverStyle,
													pressed: _pressedStyle,
												}}
											/>
										))}
								</Geographies>
							</ZoomableGroup>
						</ComposableMap>
						<ReactTooltip />
					</React.Fragment>
				)}
			</Motion>
		);
	}
}