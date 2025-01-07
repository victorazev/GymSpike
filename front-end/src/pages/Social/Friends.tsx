import styles from './Friends.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useState } from 'react';
import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.jpg';
import avatar4 from '../../assets/avatar5.jpg';
import avatar6 from '../../assets/avatar6.jpeg';

export function Friends() {
	const [isProfileActive, setIsProfileActive] = useState(false);
	const navigate = useNavigate();
	const mockFriends = [
		{ id: "afonso", name: "Afonso", image: avatar1 },
		{ id: "rica", name: "Rica", image: avatar6 },
		{ id: "leo", name: "Leo", image: avatar3 },
		{ id: "seu jorge", name: "Jorge", image: avatar4 },
	  ];
  
	const toggleProfile = () => {
	  setIsProfileActive((prev) => !prev);
	};
  
	return (
	  <div className={styles.social}>
		<h1 className={styles.title}>Amigos</h1>
		<div className={styles.cards}>
		  <div className={styles.switchContainer}>
			<span>Tornar perfil público</span>
			<label className={styles.switch}>
			  <input
				type="checkbox"
				checked={isProfileActive}
				onChange={toggleProfile}
			  />
			  <span className={styles.slider}></span>
			</label>
		  </div>
		  <Button>Adicionar amigos</Button>
		  <Button>Excluir amigos</Button>
		  <ul className={styles.friendList}>
    {mockFriends.map((friend) => (
      <li key={friend.id} className={styles.friendItem}>
        <img
          src={friend.image}
          alt={`${friend.name}'s profile`}
          className={styles.friendImage}
        />
        <label htmlFor={friend.id} className={styles.friendLabel}>
          {friend.name}
        </label>
        <input type="checkbox" id={friend.id} />
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
		{ id: "steves-marombas", name: "Steves Marombas", image: avatar1 },
		{ id: "pokemarombas", name: "Poke Marombas", image: avatar2 },
	  ];
	const navigate = useNavigate();
	return (
	<div className={styles.social}>
		<div className={styles.cards}>
		<h1 className={styles.title}>Grupos</h1>
		<Button>+ Entrar em um grupo</Button>
		<Button>Criar grupo</Button>
		<ul className={styles.groupList}>
			{mockGroups.map((group) => (
			<li key={group.id} className={styles.groupItem}>
				<img
				src={group.image}
				alt={`${group.name}'s group`}
				className={styles.groupImage}
				/>
				<div className={styles.groupDetails}>
				<h2 className={styles.groupName}>{group.name}</h2>
				<input type="checkbox" id={group.id} />
				<label htmlFor={group.id}>Selecionar</label>
				</div>
			</li>
			))}
		</ul>
		</div>
		<Button onClick={() => navigate("/friends")}>Voltar</Button>
	</div>
	);
}
