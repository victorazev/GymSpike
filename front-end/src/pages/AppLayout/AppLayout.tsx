import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AppLayout.module.css';
import {
	HiBars4,
	HiOutlineUser,
	HiOutlineUserGroup,
	HiDocumentCheck,
} from 'react-icons/hi2';

function AppLayout() {
	const navigate = useNavigate();
	const location = useLocation();

	// Função para verificar se a rota corresponde à rota atual
	const isActive = (route: string) => location.pathname === route;

	return (
		<body>
			<div className={styles.profileinfo}>
				<img
					className={styles.profileimage}
					src="https://via.placeholder.com/50"
					alt="Profile"
				/>
				<p>Nome ou username</p>
			</div>

			<main className={styles.card}>
				<Outlet />
			</main>

			<div className={styles.footer}>
				<li
					className={`${styles.icon} ${isActive('/dashboard') ? styles.active : ''}`}
					onClick={() => navigate('/')}
				>
					<HiBars4 />
					Menu
				</li>
				<li
					className={`${styles.icon} ${isActive('/user') ? styles.active : ''}`}
					onClick={() => navigate('/user')}
				>
					<HiOutlineUser />
					Perfil
				</li>
				<li
					className={`${styles.icon} ${isActive('/social') ? styles.active : ''}`}
					onClick={() => navigate('/social')}
				>
					<HiOutlineUserGroup />
					Social
				</li>
				<li
					className={`${styles.icon} ${isActive('/activities') ? styles.active : ''}`}
					onClick={() => navigate('/activities')}
				>
					<HiDocumentCheck />
					Atividades
				</li>
			</div>
		</body>
	);
}

export default AppLayout;
