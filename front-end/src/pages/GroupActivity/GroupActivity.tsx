import { useState } from 'react';

import styles from './GroupActivity.module.css';

const data = [
	{
		id: 0,
		text: 'Academia',
		image: 'https://via.placeholder.com/50',
		completed: true,
	},
	{
		id: 1,
		text: 'Academia',
		image: 'https://via.placeholder.com/50',
		completed: false,
	},
	{
		id: 2,
		text: 'Correr na esteira',
		image: 'https://via.placeholder.com/50',
		completed: false,
	},
	{
		id: 3,
		text: 'Beber 3 litros de água',
		image: 'https://via.placeholder.com/50',
		completed: true,
	},
	{
		id: 4,
		text: 'Andar de bicicleta',
		image: 'https://via.placeholder.com/50',
		completed: true,
	},
	{
		id: 5,
		text: 'Tocar na grama',
		image: 'https://via.placeholder.com/50',
		completed: false,
	},
];

function GroupActivity() {
	const [checkedItems, setCheckedItems] = useState(
		data.reduce(
			(acc, item) => ({ ...acc, [item.id]: item.completed }),
			{},
		),
	);

	const handleCheckboxChange = (e: number) => {
		setCheckedItems((prev) => ({
			...prev,
			[e]: !checkedItems[e],
		}));
	};

	return (
		<>
			<div className={styles.container}>
				{data.map((task, i) => (
					<div key={i} className={styles.task}>
						<img
							src={task.image}
							alt="Task"
							className={styles.image}
						/>
						<span className={styles.text}>{task.text}</span>
						<div className={styles.actions}>
							<input
								type="checkbox"
								checked={checkedItems[i]}
								className={styles.checkbox}
								onChange={() => handleCheckboxChange(i)}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default GroupActivity;
