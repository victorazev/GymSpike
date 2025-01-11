const token = localStorage.getItem('authToken');
const userObj = JSON.parse(localStorage.getItem('user'));

export async function adicionarAtividade(atividade: any) {
	try {
		const response = await fetch(
			`http://localhost:5000/api/users/${userObj.id}/activities`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...atividade,
					userId: userObj.id,
				}),
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Erro adicionar atividade:', error);
	}
}

export async function receberAtividades() {
	try {
		const response = await fetch(
			`http://localhost:5000/api/users/${userObj.id}/activities/`,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// const newData = data.map((activity) => ({
		// 	...activity,
		// 	date: `${activity.timestampStart.slice(
		// 		11,
		// 		13,
		// 	)}h ${activity.timestampStart.slice(
		// 		8,
		// 		10,
		// 	)}/${activity.timestampStart.slice(5, 7)}`,
		// }));

		return data;
	} catch (error) {
		console.error('Erro ao fazer login:', error);
	}
}
