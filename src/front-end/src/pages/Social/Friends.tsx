import styles from './Friends.module.css';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useState } from 'react';
import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.jpg';
import avatar4 from '../../assets/avatar4.jpeg';
import grupo1 from '../../assets/grupo1.jpg';
import grupo2 from '../../assets/grupo2.png';
import grupop from '../../assets/grupopadrao.jpg'


export function Friends() {
	const [friends, setFriends] = useState([
	  { id: "afonso", name: "Afonso", image: avatar1 },
	  { id: "rica", name: "Rica", image: avatar2 },
	  { id: "leo", name: "Leo", image: avatar3 },
	  { id: "seu jorge", name: "Jorge", image: avatar4 },
	]);
	const [showPopup, setShowPopup] = useState(false);
	const [newFriendName, setNewFriendName] = useState('');
	const navigate = useNavigate();
  
	const handleAddFriend = () => {
	  if (newFriendName.trim()) {
		setFriends((prev) => [
		  ...prev,
		  {
			id: newFriendName.toLowerCase().replace(/\s+/g, '-'),
			name: newFriendName,
			image: avatar1, // Usa a imagem padrão para novos amigos
		  },
		]);
		setNewFriendName('');
		setShowPopup(false);
	  }
	};
  
	const handleDeleteFriends = () => {
	  const checkboxes = document.querySelectorAll<HTMLInputElement>(
		'input[type="checkbox"]:checked'
	  );
	  const idsToDelete = Array.from(checkboxes).map((checkbox) => checkbox.id);
	  setFriends((prev) => prev.filter((friend) => !idsToDelete.includes(friend.id)));
	};
  
	return (
	  <div className={styles.social}>
		<h1 className={styles.title}>Amigos</h1>
		<div className={styles.cards}>
		  <div className={styles.switchContainer}>
			<span>Tornar perfil público</span>
			<label className={styles.switch}>
			  <input type="checkbox" />
			  <span className={styles.slider}></span>
			</label>
		  </div>
		  <Button onClick={() => setShowPopup(true)}>Adicionar amigos</Button>
		  <Button onClick={handleDeleteFriends}>Excluir amigos</Button>
		  <ul className={styles.friendList}>
			{friends.map((friend) => (
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
  
		{/* Popup para adicionar amigos */}
		{showPopup && (
		  <div className={styles.popupOverlay}>
			<div className={styles.popup}>
			  <h2>Adicionar Novo Amigo</h2>
			  <input
				type="text"
				value={newFriendName}
				onChange={(e) => setNewFriendName(e.target.value)}
				placeholder="Digite o nome do amigo"
				className={styles.friendInput}
			  />
			  <div className={styles.popupActions}>
				<Button onClick={handleAddFriend}>Adicionar</Button>
				<Button onClick={() => setShowPopup(false)}>Fechar</Button>
			  </div>
			</div>
		  </div>
		)}
	  </div>
	);
  }
  

  export function Groups() {
	const [mockGroups, setMockGroups] = useState([
	  { id: "steves-marombas", name: "Steves Marombas", image: grupo1 },
	  { id: "pokemarombas", name: "Poke Marombas", image: grupo2 },
	]);
	const [showPopup, setShowPopup] = useState(false);
	const [showPopup2, setShowPopup2] = useState(false);
	const [newGroupName, setNewGroupName] = useState('');
	const [enterGroupName, setEnterGroupName] = useState('');
	const navigate = useNavigate();
  
	const handleAddGroup = () => {
	  if (newGroupName.trim()) {
		setMockGroups((prev) => [
		  ...prev,
		  {
			id: newGroupName.toLowerCase().replace(/\s+/g, '-'),
			name: newGroupName,
			image: grupop, // Imagem padrão retangular
		  },
		]);
		setNewGroupName('');
		setShowPopup(false);
	  }
	};
	
	const handleEnterGroup = () => {
		if (enterGroupName.trim()) {
		  setMockGroups((prev) => [
			...prev,
			{
			  id: enterGroupName.toLowerCase().replace(/\s+/g, '-'),
			  name: enterGroupName,
			  image: grupop, // Imagem padrão retangular
			},
		  ]);
		  setEnterGroupName('');
		  setShowPopup2(false);
		}
	  };

	const handleDeleteGroups = () => {
	  const checkboxes = document.querySelectorAll<HTMLInputElement>(
		'input[type="checkbox"]:checked'
	  );
	  const idsToDelete = Array.from(checkboxes).map((checkbox) => checkbox.id);
	  setMockGroups((prev) => prev.filter((group) => !idsToDelete.includes(group.id)));
	};
  
	return (
	  <div className={styles.social}>
		<h1 className={styles.title}>Grupos</h1>
		<div className={styles.cards}>
		  <div className={styles.actions}>
		  	<Button onClick={() => setShowPopup2(true)}>Entrar em um grupo</Button>
			<Button onClick={() => setShowPopup(true)}>Criar grupo</Button>
			<Button onClick={handleDeleteGroups}>Excluir grupos</Button>
		  </div>
		  <ul className={styles.friendList}>
			{mockGroups.map((group) => (
			  <li key={group.id} className={styles.friendItem}>
				<img
				  src={group.image}
				  alt={`${group.name}'s group`}
				  className={styles.groupImage}
				/>
				<div className={styles.groupDetails}>
				  <label htmlFor={group.id} className={styles.friendLabel}>
					{group.name}
				  </label>
				  <div className={styles.groupActions}>
					<input type="checkbox" id={group.id} />
				  </div>
				</div>
			  </li>
			))}
		  </ul>
		</div>
		<Button onClick={() => navigate("/friends")}>Voltar</Button>
  
		{/* Popup para criar grupos */}
		{showPopup && (
		  <div className={styles.popupOverlay}>
			<div className={styles.popup}>
			  <h2>Criar Novo Grupo</h2>
			  <input
				type="text"
				value={newGroupName}
				onChange={(e) => setNewGroupName(e.target.value)}
				placeholder="Digite o nome do grupo"
				className={styles.friendInput}
			  />
			  <div className={styles.popupActions}>
				<Button onClick={handleAddGroup}>Criar</Button>
				<Button onClick={() => setShowPopup(false)}>Fechar</Button>
			  </div>
			</div>
		  </div>
		)}
				{/* Popup para entrar nos grupos */}
		{showPopup2 && (
		  <div className={styles.popupOverlay}>
			<div className={styles.popup}>
			  <h2>Entrar em um Grupo</h2>
			  <input
				type="text"
				value={enterGroupName}
				onChange={(e) => setEnterGroupName(e.target.value)}
				placeholder="Digite o nome do grupo"
				className={styles.friendInput}
			  />
			  <div className={styles.popupActions}>
				<Button onClick={handleEnterGroup}>Entrar</Button>
				<Button onClick={() => setShowPopup2(false)}>Fechar</Button>
			  </div>
			</div>
		  </div>
		)}
	  </div>
	);
  }

