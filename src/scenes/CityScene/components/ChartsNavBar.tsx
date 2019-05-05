import React from "react";
import { Menu } from "semantic-ui-react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "../../../intl/messages";

interface IChartNavBarProps {
	activeItem: string;
	handleItemClick: (activeItem: string) => void;
}

const ChartNavBar = (props: IChartNavBarProps & InjectedIntlProps) => {

	const { activeItem, intl, handleItemClick } = props;
	return <React.Fragment>
		<Menu size='huge' pointing secondary>
			<Menu.Item name={intl.formatMessage(messages.temperature)} color='teal' active={activeItem === 'Temperature'} onClick={(e: any, data: any) => handleItemClick(data.name)} />
			<Menu.Item name={intl.formatMessage(messages.wind)} color='teal' active={activeItem === 'Wind'} onClick={(e: any, data: any) => handleItemClick(data.name)} />
			<Menu.Item name={intl.formatMessage(messages.pressure)} color='teal' active={activeItem === 'Pressure'} onClick={(e: any, data: any) => handleItemClick(data.name)} />
			<Menu.Item name={intl.formatMessage(messages.precipitation)} color='teal' active={activeItem === 'Precipitation'} onClick={(e: any, data: any) => handleItemClick(data.name)} />
		</Menu>
	</React.Fragment>
}

export default injectIntl(ChartNavBar);