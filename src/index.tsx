import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/css/bootstrap-theme.css';
import './bootstrap/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

ReactDOM.render(
	<IntlProvider locale="en">
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</IntlProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
