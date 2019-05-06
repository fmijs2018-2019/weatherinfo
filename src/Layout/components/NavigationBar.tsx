import * as React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';

interface INavigationBarProps extends RouteComponentProps { }

class NavigationBar extends React.Component<INavigationBarProps> {
	constructor(props: Readonly<INavigationBarProps>) {
		super(props);
	}

	handleItemClick = (event: any, obj: MenuItemProps) => {
		this.props.history.push(`/${obj.name}`);
	}

	render() {
		const activeItem = this.props.history.location.pathname.slice(1);

		return (
			<Menu size='huge' pointing secondary >
				<Menu.Item header>WeatherInfo</Menu.Item>
				<Menu.Item name='home' color='teal' active={activeItem === 'home'} onClick={this.handleItemClick}>
					<FormattedMessage id="nav.home" defaultMessage="Home"/>
				</Menu.Item>
				<Menu.Item name='map' color='teal' active={activeItem === 'map'} onClick={this.handleItemClick} >
					<FormattedMessage id="nav.map" defaultMessage="Map"/>
				</Menu.Item>
				{/* <Menu.Item name='about' color='teal' active={activeItem === 'about'} onClick={this.handleItemClick}>
					<FormattedMessage id="nav.about" defaultMessage="About" />
				</Menu.Item> */}
				<Menu.Item position="right" name='preferences' color='teal' active={activeItem === 'preferences'} onClick={this.handleItemClick}>
					<FormattedMessage id="nav.preferences" defaultMessage="Preferences" />
				</Menu.Item>
			</Menu>
		)
	}
}

export default withRouter(NavigationBar);
