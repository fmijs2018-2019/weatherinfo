import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from './Layout';
import { Route, Switch, Redirect } from 'react-router';
import { HomeScene } from './scenes/home/HomeScene';
import { AboutScene } from './scenes/about/AboutScene';
import { CityScene } from './scenes/city/CityScene';

class App extends Component {
	render() {
		return <Layout>
			<Switch>
				<Route exact path="/home" component={HomeScene} />
				<Route path='/about' component={AboutScene} />
				<Route path='/city' component={CityScene} />
				<Redirect to="/home" />
			</Switch>
		</Layout>;
	}
}

export default App;
