import React from "react";
import { Menu, } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

interface IPreferencesNavBarProps {
	activeItem: string;
	handleItemClick: (e: any, data: any) => void;
}

const PreferencesNavBar = (props: IPreferencesNavBarProps) => {
	const { activeItem, handleItemClick } = props;
	return <React.Fragment>
		<Menu size='huge' pointing>
			<Menu.Item name="Favourites" color='teal' active={activeItem === 'Favourites'} onClick={handleItemClick} >
				<FormattedMessage id="preferences.favourites" defaultMessage="Favourites"/>
			</Menu.Item>
			<Menu.Item name="Settings" color='teal' active={activeItem === 'Settings'} onClick={handleItemClick} >
				<FormattedMessage id="preferences.settings" defaultMessage="Settings"/>
			</Menu.Item>
		</Menu>
	</React.Fragment>
}

export default PreferencesNavBar;