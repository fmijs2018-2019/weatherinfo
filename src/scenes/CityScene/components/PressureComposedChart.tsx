import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ComposedChart, Bar, ResponsiveContainer } from "recharts";
import * as React from 'react';
import { IPressureDataItem } from "../../../models/IPressureDataItem";
import { FormattedMessage } from "react-intl";

interface IPressureComposedChartProps {
	data: IPressureDataItem[]
}

const CustomTooltip = (props: any) => {
	if (props.active) {
		const { payload } = props.payload[0];
		return <div style={{ backgroundColor: 'white', padding: '5px', border: 'rgba(0, 0, 0, 0.5) solid 1px' }}>
			<div><FormattedMessage id="common.time" defaultMessage="Time" />: {payload.name}</div>
			<div style={{ color: '#268e61' }}>
				<FormattedMessage id="weather.pressure" defaultMessage="Pressure" />: {payload.pressure} <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa" />
			</div>
			<div style={{ color: '#f21607' }}>
				<FormattedMessage id="common.geound_level" defaultMessage="Ground level" />: {payload.grndLevel} <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa" />
			</div>
			<div style={{ color: '#0857e0' }}>
			<FormattedMessage id="common.sea_level" defaultMessage="Sea level" />: {payload.seaLevel} <FormattedMessage id="weather.pressure_hpa" defaultMessage="hpa" />
			</div>
		</div>
	}
	return null;
}

export const PressureComposedChart = (props: IPressureComposedChartProps) => {
	return <div style={{ width: "100%", height: 320 }}>
		<ResponsiveContainer>
			<ComposedChart width={850} height={320} data={props.data}
				margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis domain={[1000, 1050]} />
				<Tooltip content={<CustomTooltip />} />
				<Legend />

				<Bar dataKey="pressure" name="Pressure" fill="rgba(84, 183, 140, 0.5)" unit="hpa" />
				<Line type="monotone" name="Sea level" dataKey="seaLevel" stroke="#0857e0" unit="hpa" />
				<Line type="monotone" name="Ground level" dataKey="grndLevel" stroke="#f21607" unit="hpa" />
			</ComposedChart>
		</ResponsiveContainer>
	</div>
}