import * as React from 'react';
import ChartsNavBar from './ChartsNavBar';
import { TempComposedChart } from './TempComposedChart';
import { WindLineChart } from './WindLineChart';
import { PressureComposedChart } from './PressureComposedChart';
import { PrecipitationAriaChart } from './PrecipitationAriaChart';
import { ICurrentWeather } from '../../../models/ICurrentWeather';
import { IFiveDaysThreeHoursWeather } from '../../../models/IFIveDaysThreeHoursWeather';
import { ITempDataItem } from '../../../models/ITempDataItem';
import { IPressureDataItem } from '../../../models/IPressureDataItem';
import { IPrecipitationDataItem } from '../../../models/IPrecipitationDataItem';
import { IWindDataItem } from '../../../models/IWindDataItem';
import { checkIfInFavourites, removeFromFavourites, addToFavourites } from '../../../common/localStorageService';

interface IChartsComponentProps {
	currentWeather: ICurrentWeather,
	fiveDaysThreeHoursWeather: IFiveDaysThreeHoursWeather
}

interface IChartsComponentState {
	activeChart: string,
	tempChartData: ITempDataItem[],
	pressureChartData: IPressureDataItem[],
	precipitationChartData: IPrecipitationDataItem[],
	windChartData: IWindDataItem[],
}

export default class ChartsComponent extends React.Component<IChartsComponentProps, IChartsComponentState> {

	constructor(props: Readonly<IChartsComponentProps>) {
		super(props);

		this.state = {
			activeChart: 'Temperature',
			tempChartData: [],
			pressureChartData: [],
			precipitationChartData: [],
			windChartData: []
		}
	}

	componentDidMount = () => {
		const { currentWeather, fiveDaysThreeHoursWeather } = this.props;

		const chartsData = fiveDaysThreeHoursWeather.list.slice(0, 8);
		let tempChartData: ITempDataItem[] = [];
		let pressureChartData: IPressureDataItem[] = [];
		let precipitationChartData: IPrecipitationDataItem[] = [];
		let windChartData: IWindDataItem[] = [];

		if (!currentWeather.rain) {
			const weatherItem = chartsData.find(i => i.rain !== undefined);
			currentWeather.rain = weatherItem && weatherItem.rain;
		}

		if (!currentWeather.snow) {
			const weatherItem = chartsData.find(i => i.snow !== undefined);
			currentWeather.snow = weatherItem && weatherItem.snow;
		}

		chartsData.forEach(i => {
			const name = i.dt_txt.slice(11, 16);
			tempChartData.push({
				name,
				min: i.main.temp_min,
				max: i.main.temp_max,
				average: i.main.temp,
				icon: i.weather[0].icon
			});
			windChartData.push({ name, speed: i.wind.speed, deg: i.wind.deg });
			pressureChartData.push({
				name,
				pressure: i.main.pressure,
				grndLevel: i.main.grnd_level,
				seaLevel: i.main.sea_level
			});

			const { rain, snow } = i;
			if (rain || snow) {
				precipitationChartData.push({ name, rain: rain && rain["3h"] || 0, snow: snow && snow["3h"] || 0 });
			} else if (precipitationChartData.length > 0) {
				precipitationChartData.push({ name, rain: 0, snow: 0 });
			}
		});

		this.setState({ tempChartData, pressureChartData, windChartData, precipitationChartData })
	}

	handleChartsNavBarClick = (activeChart: string) => {
		this.setState({ activeChart });
	}

	render = () => {
		const { activeChart, tempChartData, windChartData, pressureChartData, precipitationChartData } = this.state;

		return <React.Fragment>
			<ChartsNavBar activeItem={activeChart} handleItemClick={this.handleChartsNavBarClick} />
			{activeChart === 'Temperature' && <TempComposedChart data={tempChartData}></TempComposedChart>}
			{activeChart === 'Wind' && <WindLineChart data={windChartData}></WindLineChart>}
			{activeChart === 'Pressure' && <PressureComposedChart data={pressureChartData}></PressureComposedChart>}
			{activeChart === 'Precipitation' && <PrecipitationAriaChart data={precipitationChartData}></PrecipitationAriaChart>}
		</React.Fragment>
	}
}