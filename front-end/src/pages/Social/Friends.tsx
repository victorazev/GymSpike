import styles from './Friends.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export function Friends() {
	const mockFriends = [
		{ id: "afonso", name: "Afonso" },
		{ id: "rica", name: "Rica" },
		{ id: "leo", name: "Leo" },
		{ id: "seu jorge", name: "Jorge"},
	  ];
  const navigate = useNavigate();
	return (
		<div className={styles.social}>
			<h1 className={styles.title}>Amigos</h1>
			<div className={styles.cards}>
				<Button >Ativar perfil</Button>
        		<Button >Adicionar amigos</Button>
        		<Button >Excluir amigos</Button>
				<ul className={styles.friendList}>
				{mockFriends.map((friend) => (
					<li key={friend.id}>
					<input type="checkbox" id={friend.id} /> 
					<label htmlFor={friend.id}>{friend.name}</label>
					</li>
				))}
				</ul>
			</div>
      <Button onClick={() => navigate("/groups")}>Ver grupos</Button>
		</div>
	);
}

export function Groups(){
	const mockGroups = [
		{ id: "steves-marombas", name: "Steves Marombas" },
		{ id: "pokemarombas", name: "Poke Marombas" },
	  ];
	const navigate = useNavigate();
	return (
		<div className={styles.social}>
			<div className={styles.cards}>
				<h1 className={styles.title}>Grupos</h1>
					<Button>+ Entrar em um grupo</Button>
					<Button >Criar grupo</Button>
					<ul className={styles.friendList}>
					{mockGroups.map((group) => (
						<li key={group.id}>
						<input type="checkbox" id={group.id} /> 
						<label htmlFor={group.id}>{group.name}</label>
						</li>
					))}
					</ul>
			</div>
			<Button onClick={() => navigate("/social")}>Voltar</Button>
		</div>
	);
}
