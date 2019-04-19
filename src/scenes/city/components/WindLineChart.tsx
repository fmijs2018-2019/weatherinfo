import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import * as React from 'react';
import { IWindDataItem } from "../../../models/IWindDataItem";
import { getWindDirection } from "../../../utils/getWindDirection";

interface IWindLineChart {
	data: IWindDataItem[]
}

const CustomTooltip = (props: any) => {
	if (props.active) {
		const { payload } = props.payload[0];
		return <div style={{backgroundColor: 'white', padding: '3px', border: 'rgba(0, 0, 0, 0.5) solid 1px'}}>
			<div>Time: {payload.name}</div>
			<div>Speed: {payload.speed} m/s</div>
			<div>Direction: {getWindDirection(payload.deg)} ({payload.deg})</div>
		</div>
	}
	return null;
}

export const WindLineChart = (props: IWindLineChart) => {
	return <LineChart width={850} height={320} data={props.data}
		margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="name" />
		<YAxis />
		<Tooltip
			content={<CustomTooltip />}
		/>
		<Legend />

		<Line type="monotone" dataKey="speed" stroke="#0857e0" />
	</LineChart>
}