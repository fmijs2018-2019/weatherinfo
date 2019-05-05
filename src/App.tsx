import React, { Component } from 'react';
import './App.css';
import { Layout } from './Layout';
import { Route, Switch, Redirect } from 'react-router';
import AboutScene from './scenes/AboutScene';
import HomeScene from './scenes/HomeScene';
import CityScene from './scenes/CityScene';
import MapScene from './scenes/MapScene';
import { PreferencesScene } from './scenes/PreferencesScene';

class App extends Component {
	render() {
		return <Layout>
			<Switch>
				<Route exact path="/home" component={HomeScene} />
				<Route path='/about' component={AboutScene} />
				<Route path='/cities/:city' component={CityScene} />
				<Route path='/map' component={MapScene} />
				<Route path='/preferences' component={PreferencesScene} />
				<Redirect to="/home" />
			</Switch>
		</Layout>;
	}
}

export default App;
