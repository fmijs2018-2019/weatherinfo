import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Area, ComposedChart, ResponsiveContainer } from "recharts";
import * as React from 'react';
import { ITempDataItem } from "../../../models/ITempDataItem";

interface ITempLineChartProps {
	data: ITempDataItem[]
}

const CustomTooltipp = (props: any) => {
	if (props && props.active) {
		const { payload } = props.payload[0];
		return <div style={{ backgroundColor: 'white', padding: '5px', border: 'rgba(0, 0, 0, 0.5) solid 1px' }}>
			<div>Time: {payload.name}</div>
			<div style={{ color: '#dd9d1f' }}>Avarage: {payload.avarage} °С</div>
			<div style={{ color: '#0857e0' }}>Min: {payload.min} °С</div>
			<div style={{ color: '#f21607' }}>Max: {payload.max} °С</div>
		</div>
	}
	return null;
}

export const TempComposedChart = (props: ITempLineChartProps) => {
	return <div style={{ width: "100%", height: 320 }}>
		<ResponsiveContainer>
			<ComposedChart width={850} height={320} data={props.data}
				margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip content={<CustomTooltipp />} />
				<Legend />

				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#ffbc38" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#ffbc38" stopOpacity={0} />
					</linearGradient>
				</defs>
				<Area type="monotone" name="Avarage" dataKey="avarage" stroke="#ffbc38" fillOpacity={1} fill="url(#colorUv)" unit="°С" />

				<Line type="monotone" name="Max" dataKey="max" stroke="#f21607" unit="°С" />
				<Line type="monotone" name="Min" dataKey="min" stroke="#0857e0" unit="°С" />
			</ComposedChart>
		</ResponsiveContainer>
	</div>
}