import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/swiper/dist/css/swiper.css';
import '../node_modules/react-id-swiper/src/styles/css/swiper.css'
import './bootstrap/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_bg from 'react-intl/locale-data/bg';
import messages_bg from "./translations/bg.json";
import messages_en from "./translations/en.json";
import { getSettingsOrDefault } from './common/localStorageService';

const messages: any = {
	'bg': messages_bg,
	'en': messages_en
};

export const language = 'bg'

addLocaleData([...locale_en, ...locale_bg]);

interface IStatefulIntlProvider {
	locale: string;
}

class StatefulIntlProvider extends React.Component<{}, IStatefulIntlProvider> {
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {
			locale: getSettingsOrDefault().language
		}
	}

	onLocaleChange = (locale: string) => {
		this.setState({ locale });
	}

	render() {
		const { locale } = this.state;
		return (
			<IntlProvider locale={locale} messages={messages[locale]}>
				<BrowserRouter>
					<App onLocaleChange={this.onLocaleChange}/>
				</BrowserRouter>
			</IntlProvider>
		);
	}
}

ReactDOM.render(<StatefulIntlProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
