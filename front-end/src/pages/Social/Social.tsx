import styles from './Social.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export function Social() {
  const navigate = useNavigate();
	return (
		<div className={styles.social}>
			<h1 className={styles.title}>Social</h1>
			<div className={styles.cards}>
				<Button >Ativar perfil</Button>
        <Button >Adicionar amigos</Button>
        <Button >Excluir amigos</Button>
				<ul className={styles.friendList}>
					<li><input type="checkbox" id="afonso" /> <label htmlFor="afonso">Afonso</label></li>
					<li><input type="checkbox" id="rica" /> <label htmlFor="rica">Rica</label></li>
					<li><input type="checkbox" id="leo" /> <label htmlFor="leo">Leo</label></li>
				</ul>
			</div>
      <Button onClick={() => navigate("/groups")}>Ver grupos</Button>
		</div>
	);
}

export function Groups(){
	const navigate = useNavigate();
	return (
		<div className={styles.social}>
			<div className={styles.cards}>
				<h1 className={styles.title}>Grupos</h1>
					<Button>+ Entrar em um grupo</Button>
					<Button >Criar grupo</Button>
					<ul className={styles.friendList}>
						<li><input type="checkbox" id="afonso" /> <label htmlFor="afonso">Steves Marombas</label></li>
						<li><input type="checkbox" id="rica" /> <label htmlFor="rica">Pokemarombas</label></li>
					</ul>
			</div>
			<Button onClick={() => navigate("/social")}>Voltar</Button>
		</div>
	);
}
