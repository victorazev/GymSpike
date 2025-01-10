import styles from './User.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from '../../contexts/auth';

export function User() {
	const navigate = useNavigate();
	const {user, signOut} = useAuth();
	const mockData = {
			user: {
					username: "johndoe",
					streak: 5, // Dias consecutivos
					activityHistory: [
							{ score: 100, timestamp: "2024-12-20" },
							{ score: 150, timestamp: "2024-12-21" },
							{ score: 200, timestamp: "2024-12-22" },
					],
					groups: [
							{
									name: "Grupo Steves Marombas",
									members: [
											{ username: "johndoe", totalScore: 450 },
											{ username: "janedoe", totalScore: 400 },
											{ username: "mike", totalScore: 500 },
									],
							},
							{
									name: "Grupo Poke Marombas",
									members: [
											{ username: "johndoe", totalScore: 450 },
											{ username: "maria", totalScore: 200 },
											{ username: "zé", totalScore: 300 },
									],
							},
					],
			},
	};

	const totalScore = mockData.user.activityHistory.reduce((acc, activity) => acc + activity.score, 0);

	// Calcula o ranking para cada grupo
	const groupRankings = mockData.user.groups.map(group => {
			const ranking = group.members
					.sort((a, b) => b.totalScore - a.totalScore)
					.findIndex(member => member.username === mockData.user.username) + 1;
			return {
					groupName: group.name,
					ranking,
			};
	});

	const motivationalPhrases = [
			"Você é mais forte do que imagina!",
			"Cada passo conta, continue caminhando!",
			"A persistência é o caminho para o sucesso.",
			"Transforme desafios em oportunidades!",
			"Acredite em si mesmo e tudo será possível.",
			"Pequenas ações levam a grandes resultados.",
			"O melhor dia para começar foi ontem; o segundo melhor é hoje.",
			"Você está no controle do seu futuro!",
			"O sucesso é a soma de pequenos esforços repetidos diariamente.",
			"Nunca desista dos seus sonhos!"
	];
	const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

	return (
			<div className={styles.user}>
					<h1 className={styles.title}>Perfil do {user?.firstName} </h1>
					<p className={styles.description}>{randomPhrase}</p>

					<div className={styles.cards}>
							<div className={styles.card}>
									<h2>Pontuação</h2>
									<p>Sua pontuação é {totalScore}!</p>
							</div>
							<div className={styles.card}>
									<h2>Streak</h2>
									<p>Sua streak é de {mockData.user.streak} dias!</p>
							</div>
					</div>

					{/* Renderizando um card para cada grupo */}
					<div className={styles.cards}>
							{groupRankings.map(group => (
									<div key={group.groupName} className={styles.card}>
											<h2>{group.groupName}</h2>
											<p>Ranking: {group.ranking}º lugar</p>
									</div>
							))}
					</div>

					<Button onClick={() => navigate("/userconfig")}>Configurações</Button>
					<Button onClick={() => signOut()}>Logout</Button>
			</div>
	);
}

export function Userconfig(){
	const navigate = useNavigate();
	return (
    <div className={styles.userconfig}>
      <h2 className={styles.title}>Configurações</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Alterar Apelido" />
        <input type="text" placeholder="Alterar Nome" />
        <input type="text" placeholder="Alterar Sobrenome" />
        <input type="text" placeholder="Alterar Telefone" />
        <Button onClick={() => navigate("/user")}>Salvar</Button>
        <Button onClick={() => navigate("/user")}>Voltar</Button>
      </form>
    </div>
  );
}
