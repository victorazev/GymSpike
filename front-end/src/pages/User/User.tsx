import styles from './User.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export function User() {
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
