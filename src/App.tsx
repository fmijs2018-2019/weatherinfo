import React, { Component } from 'react';
import './App.css';
import { Layout } from './Layout';
import { Route, Switch, Redirect } from 'react-router';
import { AboutScene } from './scenes/about/AboutScene';
import CityScene from './scenes/city/CityScene';
import { HomeScene } from './scenes/home/HomeScene';

class App extends Component {
	render() {
		return <Layout>
			<Switch>
				<Route exact path="/home" component={HomeScene} />
				<Route path='/about' component={AboutScene} />
				<Route path='/cities/:city' component={CityScene} />
				<Redirect to="/home" />
			</Switch>
		</Layout>;
	}
}

export default App;
