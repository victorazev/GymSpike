import { useState } from 'react';

import styles from './GroupActivity.module.css';

const data = [
	{
		text: 'Academia',
		image: 'https://via.placeholder.com/50',
		completed: true,
	},
	{
		text: 'Academia',
		image: 'https://via.placeholder.com/50',
		completed: false,
	},
	{
		text: 'Correr na esteira',
		image: 'https://via.placeholder.com/50',
		completed: false,
	},
	{
		text: 'Beber 3 litros de água',
		image: 'https://via.placeholder.com/50',
		completed: true,
	},
	{
		text: 'Andar de bicicleta',
		image: 'https://via.placeholder.com/50',
		completed: true,
	},
	{
		text: 'Tocar na grama',
		image: 'https://via.placeholder.com/50',
		completed: false,
	},
];

// Gera id para cada objeto e matém os atributos originais do objeto
const indexedData = data.map((item, index) => ({
	id: index,
	...item,
}));

function GroupActivity() {
	// Gerencia o state gerando um objeto com base apenas no ID e completed
	const [checkedItems, setCheckedItems] = useState(
		indexedData.reduce(
			(acc, item) => ({ ...acc, [item.id]: item.completed }),
			{},
		),
	);

	// Altera o state do objeto com base no ID obtido
	const handleCheckboxChange = (e: number) => {
		setCheckedItems((prev) => ({
			...prev,
			[e]: !checkedItems[e],
		}));
	};

	return (
		<>
			<div className={styles.container}>
				{indexedData.map((task) => (
					<div key={task.id} className={styles.task}>
						<img
							src={task.image}
							alt="Task"
							className={styles.image}
						/>
						<span className={styles.text}>{task.text}</span>
						<div className={styles.actions}>
							<input
								type="checkbox"
								checked={checkedItems[task.id]}
								className={styles.checkbox}
								onChange={() => handleCheckboxChange(task.id)}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default GroupActivity;
