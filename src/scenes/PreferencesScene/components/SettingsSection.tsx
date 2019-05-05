import * as React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SettingsSection.css'
import { setSettings, resetSettings, getSettingsOrDefault } from '../../../common/localStorageService';
import { ISettings } from '../../../models/ISettings';
import { ResetSettingsModal } from '../../../components/ResetSettingsModal';

interface ISettingsSectionProps {
	onLocaleChange: (locale: string) => void;
}

interface ISettingsSectionState {
	language: string,
	tempMetric: string,
	hoursFormat: string,
	showModal: boolean
}

export class SettingsSection extends React.Component<ISettingsSectionProps, ISettingsSectionState> {

	constructor(props: Readonly<ISettingsSectionProps>) {
		super(props);

		const settings: ISettings = getSettingsOrDefault();
		const { language, tempMetric, hoursFormat } = settings;

		this.state = { language, tempMetric, hoursFormat, showModal: false };
	}

	handleLanguageChange = (value: string) => {
		this.setState({ language: value });
	}

	handleTempMetricChange = (value: string) => {
		this.setState({ tempMetric: value });
	}

	handleHoursFormatChange = (value: string) => {
		this.setState({ hoursFormat: value });
	}

	onReset = () => {
		this.setState({ showModal: true });
	}

	onModalClose = () => {
		this.setState({ showModal: false });
	}

	onModalConfirm = () => {
		const settings: ISettings = resetSettings();
		const { language, tempMetric, hoursFormat } = settings;

		this.setState({ language, tempMetric, hoursFormat, showModal: false });
	}

	onApply = () => {
		const { language, tempMetric, hoursFormat } = this.state;
		const { onLocaleChange } = this.props;
		const settings: ISettings = { language, tempMetric, hoursFormat }
		setSettings(settings);
		onLocaleChange(language);
	}

	render() {
		const { language, tempMetric, hoursFormat, showModal } = this.state;

		return <Segment>
			<div className="settings-list-item row">
				<div className="col-md-2">Language</div>
				<div className="col-md-10">
					<Button.Group>
						<Button active={false} value="bg" color={language === 'bg' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleLanguageChange(data.value)}>BG</Button>
						<Button.Or />
						<Button active={false} value="en" color={language === 'en' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleLanguageChange(data.value)}>EN</Button>
					</Button.Group>
				</div>
			</div>
			<div className="settings-list-item row">
				<div className="col-md-2">Temperature metric</div>
				<div className="col-md-10">
					<Button.Group>
						<Button value="c" color={tempMetric === 'c' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleTempMetricChange(data.value)}>°C</Button>
						<Button.Or />
						<Button value="k" color={tempMetric === 'k' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleTempMetricChange(data.value)}>°K</Button>
						<Button.Or />
						<Button value="f" color={tempMetric === 'f' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleTempMetricChange(data.value)}>°F</Button>
					</Button.Group>
				</div>
			</div>
			<div className="settings-list-item row">
				<div className="col-md-2">Hours format</div>
				<div className="col-md-10">
					<Button.Group>
						<Button value="12" color={hoursFormat === '12' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleHoursFormatChange(data.value)}>12</Button>
						<Button.Or />
						<Button value="24" color={hoursFormat === '24' ? 'teal' : undefined} onClick={(event: any, data: any) => this.handleHoursFormatChange(data.value)}>24</Button>
					</Button.Group>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<Button floated="right" color="teal" basic onClick={this.onReset}>Reset</Button>
					<Button floated="right" color="teal" onClick={this.onApply}>Apply</Button>
				</div>
			</div>
			<ResetSettingsModal showModal={showModal} onClose={this.onModalClose} onConfirm={this.onModalConfirm} />
		</Segment>;
	}
}