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
	const [days, setDays] = useState(7);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const aux = await dashData(7);
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

	function handleData(range: number) {
		async function fetchData() {
			const aux = await dashData(range);
			setData(aux);
		}
		fetchData();
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<h1 className={styles.title}>Bem vindo!</h1>
			<p
				className={styles.description}
				style={{
					marginBottom: `${data?.length < 7 ? '2rem' : ''}`,
				}}
			>
				Aqui estão alguns dados prévios da sua jornada
			</p>

			{data?.length < 7 ? (
				''
			) : (
				<div className={styles.grupoBotao}>
					<button
						onClick={() => {
							setDays(7);
							handleData(7);
						}}
						disabled={days == 7 ? true : false}
					>
						7
					</button>
					<button
						onClick={() => {
							setDays(30);
							handleData(30);
						}}
						disabled={days == 30 ? true : false}
					>
						30
					</button>
				</div>
			)}

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
