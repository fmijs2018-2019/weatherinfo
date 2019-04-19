import React from "react";

import { Menu } from "semantic-ui-react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "../../../intl/messages";

interface IChartNavBarProps {
	activeItem: string;
	handleItemClick: (e: any, data: any) => void;
}

const ChartNavBar = (props: IChartNavBarProps & InjectedIntlProps) => {
	return <React.Fragment>
		<Menu size='huge' pointing secondary>
			<Menu.Item name={props.intl.formatMessage(messages.temperature)} color='teal' active={props.activeItem === 'Temperature'} onClick={props.handleItemClick} />
			<Menu.Item name={props.intl.formatMessage(messages.wind)} color='teal' active={props.activeItem === 'Wind'} onClick={props.handleItemClick} />
			<Menu.Item name={props.intl.formatMessage(messages.pressure)} color='teal' active={props.activeItem === 'Pressure'} onClick={props.handleItemClick} />
			<Menu.Item name={props.intl.formatMessage(messages.precipitation)} color='teal' active={props.activeItem === 'Precipitation'} onClick={props.handleItemClick} />
		</Menu>
	</React.Fragment>
}

export default injectIntl(ChartNavBar);