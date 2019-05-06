import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import * as React from 'react';
import { IWindDataItem } from "../../../models/IWindDataItem";
import { getWindDirection } from "../../../utils/getWindDirection";
import { FormattedMessage } from "react-intl";

interface IWindLineChart {
	data: IWindDataItem[]
}

const CustomTooltip = (props: any) => {
	if (props.active) {
		const { payload } = props.payload[0];
		return <div style={{ backgroundColor: 'white', padding: '5px', border: 'rgba(0, 0, 0, 0.5) solid 1px' }}>
			<div><FormattedMessage id="common.time" defaultMessage="Time" />: {payload.name}</div>
			<div style={{ color: '#0857e0' }}>
				<FormattedMessage id="weather.wind_speed" defaultMessage="Speed" />: {payload.speed} <FormattedMessage id="weather.wind_mps" defaultMessage="m/s" />
			</div>
			<div style={{ color: '#f21607' }}>
				<FormattedMessage id="weather.wind_direction" defaultMessage="Direction" />: {getWindDirection(payload.deg)} ({payload.deg})
			</div>
		</div>
	}
	return null;
}

export const WindLineChart = (props: IWindLineChart) => {
	return <div style={{ width: "100%", height: 320 }}>
		<ResponsiveContainer>
			<LineChart width={850} height={320} data={props.data}
				margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip
					content={<CustomTooltip />}
				/>
				<Legend />

				<Line type="monotone" name="Speed" dataKey="speed" stroke="#0857e0" unit="m/s" />
			</LineChart>
		</ResponsiveContainer>
	</div>
}