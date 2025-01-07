/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

function Dashboard() {
	const data = [
		{
			name: 'Dia 1',
			score: 300,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Dia 2',
			score: 200,
			pv: 1398,
			amt: 2210,
		},
		{
			name: 'Dia 3',
			score: 230,
			pv: 9800,
			amt: 2290,
		},
		{
			name: 'Dia 4',
			score: 278,
			pv: 3908,
			amt: 2000,
		},
		{
			name: 'Dia 5',
			score: 189,
			pv: 4800,
			amt: 2181,
		},
		{
			name: 'Dia 6',
			score: 239,
			pv: 3800,
			amt: 2500,
		},
		{
			name: 'Dia 7',
			score: 349,
			pv: 4300,
			amt: 2100,
		},
	];

	return (
		<div style={{ height: 400, width: '100%' }}>
			<ResponsiveContainer>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<Tooltip />
					<Bar
						dataKey="score"
						fill="#ffae00"
						activeBar={
							<Rectangle fill="#543A14" stroke="#131010" />
						}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

export default Dashboard;
