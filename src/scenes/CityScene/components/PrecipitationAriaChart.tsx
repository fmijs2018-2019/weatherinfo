import { IPrecipitationDataItem } from "../../../models/IPrecipitationDataItem";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from "recharts";
import * as React from 'react';
import { FormattedMessage } from "react-intl";

interface IPrecipitationAriaChartProps {
	data: IPrecipitationDataItem[]
}

export const PrecipitationAriaChart = (props: IPrecipitationAriaChartProps) => {
	return props.data.length > 0 &&
		<div style={{ width: "100%", height: 320 }}>
			<ResponsiveContainer>
				<AreaChart width={850} height={320} data={props.data}
					margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="rain" name="Rain" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" unit="mm" />
					<Area type="monotone" dataKey="snow" name="Snow" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" unit="mm" />
				</AreaChart>
			</ResponsiveContainer>
		</div> ||
		<FormattedMessage id="common.missing-data" defaultMessage="There is no available data."></FormattedMessage>
}