import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Area, ComposedChart, ResponsiveContainer } from "recharts";
import * as React from 'react';
import { ITempDataItem } from "../../../models/ITempDataItem";
import { FormattedMessage } from "react-intl";
import FormattedTemperature from "../../../components/FormattedTemperature";
import { getSettingsOrDefault } from "../../../common/localStorageService";
import { ISettings } from "../../../models/ISettings";

interface ITempLineChartProps {
	data: ITempDataItem[]
}

const CustomTooltipp = (props: any) => {
	if (props && props.active) {
		const { payload } = props.payload[0];
		return <div style={{ backgroundColor: 'white', padding: '5px', border: 'rgba(0, 0, 0, 0.5) solid 1px' }}>
			<div>
				<FormattedMessage id="common.time" defaultMessage="Time" />: {payload.name}
			</div>
			<div style={{ color: '#dd9d1f' }}>
				<FormattedMessage id="common.average" defaultMessage="Average" />: <FormattedTemperature temp={payload.average} />
			</div>
			<div style={{ color: '#0857e0' }}>
				<FormattedMessage id="common.min" defaultMessage="Min" />: <FormattedTemperature temp={payload.min} />
			</div>
			<div style={{ color: '#f21607' }}>
				<FormattedMessage id="common.max" defaultMessage="Max" />: <FormattedTemperature temp={payload.max} />
			</div>
		</div>
	}
	return null;
}

export const TempComposedChart = (props: ITempLineChartProps) => {
	const unit = '°' + getSettingsOrDefault().tempMetric.toUpperCase();

	return <div style={{ width: "100%", height: 320 }}>
		<ResponsiveContainer>
			<ComposedChart width={850} height={320} data={props.data}
				margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip content={<CustomTooltipp />} />
				<Legend payload={[{
					value: <FormattedMessage id="common.average" defaultMessage="Average" />,
					type: 'line',
					id: 'avg',
					color: '#ffbc38'
				},
				{
					value: <FormattedMessage id="common.min" defaultMessage="Min" />,
					type: 'line',
					id: 'min',
					color: '#f21607'
				},
				{
					value: <FormattedMessage id="common.max" defaultMessage="Max" />,
					type: 'line',
					id: 'max',
					color: '#0857e0'
				}]} />

				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#ffbc38" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#ffbc38" stopOpacity={0} />
					</linearGradient>
				</defs>
				<Area type="monotone" name="Average" dataKey="average" stroke="#ffbc38" fillOpacity={1} fill="url(#colorUv)" unit="°С" />

				<Line type="monotone" dataKey="max" stroke="#f21607" unit={unit} />
				<Line type="monotone" dataKey="min" stroke="#0857e0" unit={unit} />
			</ComposedChart>
		</ResponsiveContainer>
	</div>
}