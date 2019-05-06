import React from "react";
import { Menu } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

interface IChartNavBarProps {
	activeItem: string;
	handleItemClick: (activeItem: string) => void;
}

const ChartNavBar = (props: IChartNavBarProps) => {

	const { activeItem, handleItemClick } = props;
	return <React.Fragment>
		<Menu size='huge' pointing secondary>
			<Menu.Item name="Temperature" color='teal' active={activeItem === 'Temperature'} onClick={(e: any, data: any) => handleItemClick(data.name)} >
				<FormattedMessage id="weather.temperature" defaultMessage="Temperature"/>
			</Menu.Item>
			<Menu.Item name="Wind" color='teal' active={activeItem === 'Wind'} onClick={(e: any, data: any) => handleItemClick(data.name)} >
				<FormattedMessage id="weather.wind" defaultMessage="Wind" />
			</Menu.Item>
			<Menu.Item name="Pressure" color='teal' active={activeItem === 'Pressure'} onClick={(e: any, data: any) => handleItemClick(data.name)} >
				<FormattedMessage id="weather.pressure" defaultMessage="Pressure"/>
			</Menu.Item>
			<Menu.Item name="Precipitation" color='teal' active={activeItem === 'Precipitation'} onClick={(e: any, data: any) => handleItemClick(data.name)} >
				<FormattedMessage id="weather.precipitation" defaultMessage="Precipitation"/>
			</Menu.Item>
		</Menu>
	</React.Fragment>
}

export default ChartNavBar;