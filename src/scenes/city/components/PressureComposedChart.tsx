import {  CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ComposedChart, Bar } from "recharts";
import * as React from 'react';
import { IPressureDataItem } from "../../../models/IPressureDataItem";

interface IPressureComposedChartProps {
	data: IPressureDataItem[]
}

export const PressureComposedChart = (props: IPressureComposedChartProps) => {
	console.log(props.data);
	return <ComposedChart width={850} height={320} data={props.data}
		margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="name" />
		<YAxis domain={[1000, 1050]} />
		<Tooltip />
		<Legend />

		<Bar dataKey="pressure" fill="rgba(84, 183, 140, 0.5)" />
		<Line type="monotone" dataKey="seaLevel" stroke="#0857e0" />
		<Line type="monotone" dataKey="grndLevel" stroke="#f21607" />
		{/* <Line type="monotone" dataKey="pressure" stroke="#f21607" /> */}
	</ComposedChart>
}