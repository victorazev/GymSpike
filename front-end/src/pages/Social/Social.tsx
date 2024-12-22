import styles from './Social.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function Social() {
    const navigate = useNavigate();
	return (
		<div className={styles.social}>
			<h1 className={styles.title}>Social</h1>
			<Button >Ativar perfil</Button>
            <Button >Adicionar amigos</Button>
            <Button >Excluir amigos</Button>
			
			<div className={styles.cards}>
				<div className={styles.card}>
					<h2>Amigos</h2>
					<li>Afonso</li>
                    <li>Rica</li>
                    <li>Leo</li>
				</div>
			</div>

            <Button onClick={() => navigate("/groups")}>Ver grupos</Button>
		</div>
	);
}

export default Social;
