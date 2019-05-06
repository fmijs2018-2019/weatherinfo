import { IPrecipitationDataItem } from "../../../models/IPrecipitationDataItem";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, Legend } from "recharts";
import * as React from 'react';
import { FormattedMessage } from "react-intl";

interface IPrecipitationAriaChartProps {
	data: IPrecipitationDataItem[]
}

const CustomTooltip = (props: any) => {
	if (props.active) {
		const { payload } = props.payload[0];
		return <div style={{ backgroundColor: 'white', padding: '5px', border: 'rgba(0, 0, 0, 0.5) solid 1px' }}>
			<div><FormattedMessage id="common.time" defaultMessage="Time" />: {payload.name}</div>
			<div style={{ color: '#082d68' }}>
				<FormattedMessage id="weather.rain" defaultMessage="Rain" />: {payload.rain} <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa" />
			</div>
			<div style={{ color: '#066017' }}>
				<FormattedMessage id="weather.snow" defaultMessage="Snow" />: {payload.snow} <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa" />
			</div>
		</div>
	}
	return null;
}

export const PrecipitationAriaChart = (props: IPrecipitationAriaChartProps) => {
	return props.data.length > 0 &&
		<div style={{ width: "100%", height: 320 }}>
			<ResponsiveContainer>
				<AreaChart width={850} height={320} data={props.data}
					margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#082d68" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#082d68" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#066017" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#066017" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip content={<CustomTooltip />} />
					<Legend payload={[{
						value: <FormattedMessage id="weather.rain" defaultMessage="Rain" />,
						type: 'line',
						id: 'rain',
						color: '#082d68'
					},
					{
						value: <FormattedMessage id="weather.snow" defaultMessage="Snow" />,
						type: 'line',
						id: 'snow',
						color: '#066017'
					}]} />
					<Area type="monotone" dataKey="rain" stroke="#082d68" fillOpacity={1} fill="url(#colorUv)" unit="mm" />
					<Area type="monotone" dataKey="snow" stroke="#066017" fillOpacity={1} fill="url(#colorPv)" unit="mm" />
				</AreaChart>
			</ResponsiveContainer>
		</div> ||
		<FormattedMessage id="common.missing-data" defaultMessage="There is no available data."></FormattedMessage>
}