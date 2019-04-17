import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';

interface INavigationBarProps extends RouteComponentProps { }
interface INavigationBarState {
	activeItem: string;
}

class NavigationBar extends React.Component<INavigationBarProps, INavigationBarState> {
	constructor(props: Readonly<INavigationBarProps>) {
		super(props);

		this.state = { activeItem: this.props.history.location.pathname.slice(1)}
	}

	handleItemClick = (e: any, obj: any) => {
		this.setState({ activeItem: obj.name });
		this.props.history.push(obj.name);
	}

	render() {
		const { activeItem } = this.state

		return (
			<React.Fragment>
				<Menu size='huge' pointing secondary>
					<Menu.Item header>WeatherInfo</Menu.Item>
					<Menu.Item name='home' color='teal' active={activeItem === 'home'} onClick={this.handleItemClick} />
					<Menu.Item name='about'  color='teal' active={activeItem === 'about'} onClick={this.handleItemClick} />
				</Menu>
			</React.Fragment >
		)
	}
}

export default withRouter(NavigationBar);
