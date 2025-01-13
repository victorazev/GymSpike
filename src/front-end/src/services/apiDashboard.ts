const token = localStorage.getItem('authToken');
const userObj = JSON.parse(localStorage.getItem('user'));

export async function dashData() {
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

		const newData = data.map((activity) => ({
			...activity,
			date: `${activity.timestampStart.slice(
				11,
				13,
			)}h ${activity.timestampStart.slice(
				8,
				10,
			)}/${activity.timestampStart.slice(5, 7)}`,
		}));

		return newData;
	} catch (error) {
		console.error('Erro ao fazer login:', error);
	}
}
