import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AppLayout.module.css';
import {
	HiBars4,
	HiOutlineUser,
	HiOutlineUserGroup,
	HiDocumentCheck,
} from 'react-icons/hi2';
import avatar1 from '../../assets/avatar4.png';

function AppLayout() {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (route: string) => location.pathname === route;

	return (
		<div>
			<div className={styles.profileinfo}>
				<img
					className={styles.profileimage}
					src={avatar1}
					alt="Profile"
				/>
				<p>Nome ou username</p>
			</div>

			<main className={styles.card}>
				<Outlet />
			</main>

			<ul className={styles.footer}>
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
					className={`${styles.icon} ${isActive('/friends') ? styles.active : ''}`}
					onClick={() => navigate('/friends')}
				>
					<HiOutlineUserGroup />
					Amigos
				</li>
				<li
					className={`${styles.icon} ${isActive('/activities') ? styles.active : ''}`}
					onClick={() => navigate('/userActivity')}
				>
					<HiDocumentCheck />
					Atividades
				</li>
			</ul>
		</div>
	);
}


export default AppLayout;
