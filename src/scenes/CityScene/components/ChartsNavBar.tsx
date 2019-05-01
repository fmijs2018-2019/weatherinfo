import React from "react";

import { Menu, Button, Icon } from "semantic-ui-react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "../../../intl/messages";
import { HeartButtonIcon } from "../../../components/HeartButtonIcon";

interface IChartNavBarProps {
	activeItem: string;
	cityId: number;
	handleItemClick: (e: any, data: any) => void;
}

const ChartNavBar = (props: IChartNavBarProps & InjectedIntlProps) => {
	const { cityId, activeItem, intl, handleItemClick } = props;
	return <React.Fragment>
		<Menu size='huge' pointing secondary>
			<Menu.Item name={intl.formatMessage(messages.temperature)} color='teal' active={activeItem === 'Temperature'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.wind)} color='teal' active={activeItem === 'Wind'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.pressure)} color='teal' active={activeItem === 'Pressure'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.precipitation)} color='teal' active={activeItem === 'Precipitation'} onClick={handleItemClick} />
			<Menu.Item position="right">
				<HeartButtonIcon cityId={cityId} />
			</Menu.Item>
		</Menu>
	</React.Fragment>
}

export default injectIntl(ChartNavBar);