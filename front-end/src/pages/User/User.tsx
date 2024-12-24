import styles from './User.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export function User() {
    const navigate = useNavigate();
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
			  name: "Grupo 1",
			  members: [
				{ username: "johndoe", totalScore: 450 },
				{ username: "janedoe", totalScore: 400 },
				{ username: "mike", totalScore: 500 },
			  ],
			},
		  ],
		},
	  };
	  const totalScore = mockData.user.activityHistory.reduce((acc, activity) => acc + activity.score, 0);
	  const group = mockData.user.groups[0];
	  const ranking = group.members
        .sort((a, b) => b.totalScore - a.totalScore)
        .findIndex(member => member.username === mockData.user.username) + 1;
	return (
		<div className={styles.user}>
			<h1 className={styles.title}>Perfil</h1>
			<p className={styles.description}>
				Uma frase motivacional foda!
			</p>
			
				<div className={styles.cards}>
				<div className={styles.card}>
					<h2>Pontuação</h2>
					<p>Sua pontuação é {totalScore}!</p>
				</div>
				<div className={styles.card}>
					<h2>Streak</h2>
					<p>Sua streak é de {mockData.user.streak} dias! .</p>
				</div>
        		<div className={styles.card}>
					<h2>Ranking</h2>
					<p>{ranking}º lugar</p>
				</div>
				<Button onClick={() => navigate("/userconfig")}>Configurações</Button>
			</div>
		</div>
	);
}

export function Userconfig(){
	const navigate = useNavigate();
	return(
		<div className={styles.user}>
			<div className={styles.cards}>
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
		</div>
	);
}
