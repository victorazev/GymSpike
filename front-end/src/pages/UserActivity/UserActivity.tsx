import { SetStateAction, useState } from 'react';
import {
	HiOutlineArrowUpCircle,
	HiOutlineArrowDownCircle,
} from 'react-icons/hi2';

import styles from './UserActivity.module.css';

function UserActivity() {
	const data = [
		{
			name: 'Dia 1',
			tipo: 'Corrida',
			score: 300,
			averageHeartHate: 140,
			horaInicio: '10:00',
			horaFim: '11:30',
		},
		{
			name: 'Dia 2',
			tipo: 'Natação',
			score: 200,
			averageHeartHate: 110,
			horaInicio: '12:00',
			horaFim: '13:00',
		},
		{
			name: 'Dia 3',
			tipo: 'Esteira',
			score: 230,
			averageHeartHate: 112,
			horaInicio: '11:07',
			horaFim: '12:07',
		},
		{
			name: 'Dia 4',
			tipo: 'Corrida',
			score: 278,
			averageHeartHate: 120,
			horaInicio: '10:20',
			horaFim: '11:40',
		},
		{
			name: 'Dia 5',
			tipo: 'Esteira',
			score: 189,
			averageHeartHate: 99,
			horaInicio: '15:00',
			horaFim: '16:00',
		},
		{
			name: 'Dia 6',
			tipo: 'Natação',
			score: 239,
			averageHeartHate: 110,
			horaInicio: '18:10',
			horaFim: '19:20',
		},
		{
			name: 'Dia 7',
			tipo: 'Corrida',
			score: 349,
			averageHeartHate: 150,
			horaInicio: '10:00',
			horaFim: '12:45',
		},
	];

	const [expandedIndex, setExpandedIndex] = useState<
		string | null
	>(null);

	const toggleExpand = (
		index: SetStateAction<string | null>,
	) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<>
			{data.map((data) => (
				<div
					key={data.name}
					className={`${styles.activityCard} ${
						expandedIndex === data.name ? styles.expanded : ''
					}`}
					onClick={() => toggleExpand(data.name)}
				>
					<div className={styles.activityHeader}>
						<span>
							{data.tipo} - {data.name}{' '}
						</span>

						{expandedIndex === data.name ? (
							<HiOutlineArrowUpCircle />
						) : (
							<HiOutlineArrowDownCircle />
						)}
					</div>
					{expandedIndex === data.name && (
						<div className={styles.activityDetails}>
							<h3>Início do exercício</h3>
							<p>{data.horaInicio}</p>
							<h3>Fim do exercício</h3>
							<p>{data.horaFim}</p>
							<h3>Média de batimentos</h3>
							<p>{data.averageHeartHate}</p>
							<h3>Score obtido</h3>
							<p>{data.score}</p>
						</div>
					)}
				</div>
			))}
		</>
	);
}

export default UserActivity;
