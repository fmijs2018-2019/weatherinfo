import React from "react";

import { Menu, Button, Icon } from "semantic-ui-react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "../../../intl/messages";

interface IChartNavBarProps {
	activeItem: string;
	isInFavourites: boolean;
	handleItemClick: (e: any, data: any) => void;
	onHeartClick: () => void;
}

const ChartNavBar = (props: IChartNavBarProps & InjectedIntlProps) => {
	const { isInFavourites, onHeartClick, activeItem, intl, handleItemClick } = props;
	return <React.Fragment>
		<Menu size='huge' pointing secondary>
			<Menu.Item name={intl.formatMessage(messages.temperature)} color='teal' active={activeItem === 'Temperature'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.wind)} color='teal' active={activeItem === 'Wind'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.pressure)} color='teal' active={activeItem === 'Pressure'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.precipitation)} color='teal' active={activeItem === 'Precipitation'} onClick={handleItemClick} />
			<Menu.Item position="right">
				{isInFavourites && <Button icon onClick={onHeartClick}><Icon name="heart" color="red" size="large" /></Button>}
				{!isInFavourites && <Button icon onClick={onHeartClick}><Icon name="heart outline" color="red" size="large" /></Button>}
			</Menu.Item>
		</Menu>
	</React.Fragment>
}

export default injectIntl(ChartNavBar);