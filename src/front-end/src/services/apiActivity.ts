const token = localStorage.getItem('authToken');
const userObj = JSON.parse(localStorage.getItem('user'));

export async function adicionarAtividade(atividade: any) {
	const bodyReq = JSON.stringify({
		...atividade,
		userId: userObj.id,
	});
	console.log(bodyReq);
	return atividade;

	try {
		const data = await fetch(
			`http://localhost:5000/api/users/${userObj.id}/activities`,
			{
				method: 'POST',
				body: JSON.stringify({
					...atividade,
					userId: userObj.id,
				}),
				headers: { Authorization: `Bearer ${token}` },
			},
		).then((rsp) => rsp.json());
		console.log(data);
		return data;
	} catch (error) {
		console.error('Erro adicionar atividade:', error);
	}
}
