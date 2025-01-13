import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

import { dashData } from '../../services/apiDashboard';

import styles from './Dashboard.module.css';
import Loader from '../../components/LoadSpinner/Loader';
import { CustomTooltip } from './CustomTooltip';

interface Data {
	score: number;
	exerciseType: string;
	timestampStart: Date;
}

function Dashboard() {
	const [data, setData] = useState<Data[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const aux = await dashData();
			setData(aux);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (!data?.length) {
		return (
			<div>
				<h1 className={styles.title}>Bem vindo!</h1>
				<p className={styles.ajuda}>
					Identificamos aqui que você ainda não possui nenhuma
					atividade registrada.
				</p>
				<p className={styles.ajuda}>
					Mas isso não é um problema e ainda tem tempo para
					começar!
				</p>
				<p className={styles.ajuda}>
					Comece agora mesmo, aproveita e chama um amigo, assim
					fica ainda melhor!
				</p>
			</div>
		);
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<h1 className={styles.title}>Bem vindo!</h1>
			<p className={styles.description}>
				Aqui estão alguns dados prévios da sua jornada
			</p>
			<ResponsiveContainer style={{ marginBottom: '1rem' }}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<Tooltip content={<CustomTooltip />} />
					<Bar
						dataKey="score"
						fill="#ffae00"
						activeBar={
							<Rectangle fill="#543A14" stroke="#131010" />
						}
					/>
				</BarChart>
			</ResponsiveContainer>
			{data ? (
				<p className={styles.description}>
					Seu score médio é de{' '}
					{Math.ceil(
						data?.reduce((acc, cur) => acc + cur.score, 0) /
							data?.length +
							1,
					)}{' '}
					pontos
				</p>
			) : null}
		</div>
	);
}

export default Dashboard;
