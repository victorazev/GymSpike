import { formatDistanceStrict } from 'date-fns';

type Tooltip = {
	active: boolean;
	payload: any;
	coordinate: any;
};

export const CustomTooltip = ({
	active,
	payload,
	coordinate,
}: Tooltip) => {
	if (active && payload && payload.length) {
		const tooltipStyle = {
			position: 'absolute',
			top: `${coordinate.y}px`, // Usa a posição vertical fornecida
			left: `${coordinate.x}px`, // Usa a posição horizontal fornecida
			transform: `translate(${
				coordinate.x < 200 ? '0%' : '-100%'
			}, ${coordinate.y < 100 ? '0%' : '-100%'})`, // Centraliza o tooltip
			whiteSpace: 'nowrap', // Previne que o tooltipe quebre a linha a cada espaço em branco
			pointerEvents: 'none', // Evita interferência no hover

			backgroundColor: 'white',
			border: '1px solid #ccc',
			borderRadius: '8px',
			padding: '10px',
			boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)',
			transition: 'all 0.3s ease-in-out',
		};

		return (
			<div style={tooltipStyle}>
				<p>
					{payload[0].payload.exerciseType == 'TREADMILL'
						? 'Esteira'
						: payload[0].payload.exerciseType == 'WEIGHTLIFTING'
						? 'Musculação'
						: payload[0].payload.exerciseType == 'RUNNING'
						? 'Corrida'
						: payload[0].payload.exerciseType == 'SWIMMING'
						? 'Natação'
						: payload[0].payload.exerciseType}
				</p>
				<p>
					{formatDistanceStrict(
						payload[0].payload.timestampStart,
						payload[0].payload.timestampEnd,
						{ unit: 'minute' },
					).split(' ', 1)}{' '}
					minutos
				</p>
				<p>{payload[0].payload.estimatedCalories} calorias</p>
				<p>{payload[0].payload.score} pontos</p>
			</div>
		);
	}

	return null;
};
