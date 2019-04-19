import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Area, ComposedChart } from "recharts";
import * as React from 'react';
import { ITempDataItem } from "../../../models/ITempDataItem";

interface ITempLineChartProps {
	data: ITempDataItem[]
}

// const CustomTooltipp = (props: any) => {
// 	if (props.active) {
// 		const { payload } = props.payload[0];
// 		return <div style={{ backgroundColor: 'white', padding: '3px', border: 'rgba(0, 0, 0, 0.5) solid 1px' }}>
// 			<div>Time: {payload.name}</div>
// 			<img src={payload.icon} />
// 			<div>Avarage: {payload.avarage} °С</div>
// 		</div>
// 	}
// 	return null;
// }

export const TempComposedChart = (props: ITempLineChartProps) => {
	return <ComposedChart width={850} height={320} data={props.data}
		margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="name" />
		<YAxis />
		<Tooltip />
		<Legend />

		<defs>
			<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
				<stop offset="5%" stopColor="#ffbc38" stopOpacity={0.8} />
				<stop offset="95%" stopColor="#ffbc38" stopOpacity={0} />
			</linearGradient>
		</defs>
		<Area type="monotone" dataKey="avarage" stroke="#ffbc38" fillOpacity={1} fill="url(#colorUv)" />

		<Line type="monotone" dataKey="max" stroke="#f21607" />
		<Line type="monotone" dataKey="min" stroke="#0857e0" />
	</ComposedChart>
}