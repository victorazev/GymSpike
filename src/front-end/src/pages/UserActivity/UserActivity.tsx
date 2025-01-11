import { SetStateAction, useEffect, useState } from 'react';
import {
	HiOutlineArrowUpCircle,
	HiOutlineArrowDownCircle,
} from 'react-icons/hi2';
import { format, formatDistanceStrict } from 'date-fns';

import {
	adicionarAtividade,
	receberAtividades,
} from '../../services/apiActivity';
import scoreCalculator from './scoreCalculator';

import styles from './UserActivity.module.css';
import Button from '../../components/Button/Button';
import Loader from '../../components/LoadSpinner/Loader';

interface Data {
	score: number;
	exerciseType: string;
	timestampStart: Date;
	timestampEnd: Date;
	avgHeartbeat: number;
	estimatedCalories: number;
	_id: string;
}

function UserActivity() {
	const [formData, setFormData] = useState({
		exerciseType: '',
		timestampStart: '',
		timestampEnd: '',
		avgHeartbeat: null,
		estimatedCalories: null,
	});

	const [data, setData] = useState<Data[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [expandedIndex, setExpandedIndex] = useState<
		string | null
	>(null);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const atividades = await receberAtividades();
			setData(atividades);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	const toggleExpand = (
		index: SetStateAction<string | null>,
	) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	const options = [
		{ value: 'RUNNING', label: 'Corrida' },
		{ value: 'WEIGHTLIFTING', label: 'Musculação' },
		{ value: 'TREADMILL', label: 'Esteira' },
		{ value: 'SWIMMING', label: 'Natação' },
	];

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const horaInicio = formData.timestampStart.slice(11, 16);
		const horaFim = formData.timestampEnd.slice(11, 16);

		const scoreTime = scoreCalculator(horaInicio, horaFim);

		const score = Math.ceil(
			scoreTime *
				(formData.estimatedCalories / 200) *
				(formData.avgHeartbeat / 100),
		);

		adicionarAtividade({
			...formData,
			score: score,
			estimatedCalories: Number(formData.estimatedCalories),
			avgHeartbeat: Number(formData.avgHeartbeat),
		});

		const atividades = await receberAtividades();
		setData(atividades);
	};

	return (
		<>
			<div className={styles.activityCard} key="form">
				<div className={styles.activityHeader}>
					<span style={{ fontSize: '20px' }}>
						Adicione uma atividade
					</span>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.activityDetails}>
						<div>
							<label>Tipo de exercício</label>
							<br />
							<select
								style={{
									marginBottom: '10px',
									fontSize: '16px',
								}}
								name="exerciseType"
								value={formData.exerciseType}
								onChange={handleChange}
								required
							>
								{options.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							</select>
						</div>
						<div>
							<label>Início do exercício</label>
							<input
								type="datetime-local"
								name="timestampStart"
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label>Fim do exercício</label>
							<input
								type="datetime-local"
								name="timestampEnd"
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label>Média de batimentos</label>
							<input
								type="number"
								placeholder="Ex.: 140"
								name="avgHeartbeat"
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label>Calorias</label>
							<input
								type="number"
								placeholder="Ex.: 300"
								name="estimatedCalories"
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<Button type={'submit'}>Adicionar</Button>
						</div>
					</div>
				</form>
			</div>

			{data?.map((data) => (
				<div
					key={data._id}
					className={`${styles.activityCard} ${
						expandedIndex === data._id ? styles.expanded : ''
					}`}
					onClick={() => toggleExpand(data._id)}
				>
					<div className={styles.activityHeader}>
						<span>
							{data.exerciseType == 'TREADMILL'
								? 'Esteira'
								: data.exerciseType == 'WEIGHTLIFTING'
								? 'Musculação'
								: data.exerciseType == 'RUNNING'
								? 'Corrida'
								: data.exerciseType == 'SWIMMING'
								? 'Natação'
								: data.exerciseType}{' '}
							- {format(data.timestampStart, 'dd/MM/yy H:mm')}{' '}
						</span>

						{expandedIndex === data._id ? (
							<HiOutlineArrowUpCircle />
						) : (
							<HiOutlineArrowDownCircle />
						)}
					</div>
					{expandedIndex === data._id && (
						<div className={styles.activityDetails}>
							<h3>Duração do exercício</h3>
							<p>
								{format(data.timestampStart, 'H:mm')} -{' '}
								{format(data.timestampEnd, 'H:mm')}
								{' | '}
								{formatDistanceStrict(
									data.timestampStart,
									data.timestampEnd,
									{ unit: 'minute' },
								).split(' ', 1)}{' '}
								minutos
							</p>
							<h3>Média de batimentos</h3>
							<p>{data.avgHeartbeat} bpm</p>
							<h3>Calorias estimadas</h3>
							<p>{data.estimatedCalories} calorias</p>
							<h3>Score obtido</h3>
							<p>{data.score} pontos</p>
						</div>
					)}
				</div>
			))}
		</>
	);
}

export default UserActivity;
