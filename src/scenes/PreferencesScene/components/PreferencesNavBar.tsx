import React from "react";

import { Menu, } from "semantic-ui-react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { messages } from "../../../intl/messages";

interface IPreferencesNavBarProps {
	activeItem: string;
	handleItemClick: (e: any, data: any) => void;
}

const PreferencesNavBar = (props: IPreferencesNavBarProps & InjectedIntlProps) => {
	const { activeItem, intl, handleItemClick } = props;
	return <React.Fragment>
		<Menu size='huge' pointing>
			<Menu.Item name={intl.formatMessage(messages.favourites)} color='teal' active={activeItem === 'Favourites'} onClick={handleItemClick} />
			<Menu.Item name={intl.formatMessage(messages.settings)} color='teal' active={activeItem === 'Settings'} onClick={handleItemClick} />
		</Menu>
	</React.Fragment>
}

export default injectIntl(PreferencesNavBar);