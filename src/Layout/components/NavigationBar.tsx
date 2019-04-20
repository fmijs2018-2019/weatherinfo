import * as React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';

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
				<Menu.Item name='home' color='teal' active={activeItem === 'home'} onClick={this.handleItemClick} />
				<Menu.Item name='about' color='teal' active={activeItem === 'about'} onClick={this.handleItemClick} />
				<Menu.Item name='map' color='teal' active={activeItem === 'map'} onClick={this.handleItemClick} />
			</Menu>
		)
	}
}

export default withRouter(NavigationBar);
