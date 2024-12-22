import styles from './User.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function User() {
    const navigate = useNavigate();
	return (
		<div className={styles.user}>
			<h1 className={styles.title}>Perfil</h1>
			<p className={styles.description}>
				Uma frase motivacional foda!
			</p>
			
			<div className={styles.cards}>
				<div className={styles.card}>
					<h2>Pontuação</h2>
					<p>Aqui falamos sua pontuação.</p>
				</div>
				<div className={styles.card}>
					<h2>Streak</h2>
					<p>Aqui falamos seu streak.</p>
				</div>
				<div className={styles.card}>
					<h2>Ranking</h2>
					<p>Aqui falamos seu ranking.</p>
				</div>
                <div className={styles.card}>
					<h2>Ranking</h2>
					<p>Aqui falamos seu ranking.</p>
				</div>
                <div className={styles.card}>
					<h2>Ranking</h2>
					<p>Aqui falamos seu ranking.</p>
				</div>
			</div>

            <Button onClick={() => navigate("/userconfig")}>Configurações</Button>
		</div>
	);
}

export default User;
