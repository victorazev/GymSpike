import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';
import {
	HiBars4,
	HiOutlineUser,
	HiOutlineUserGroup,
	HiDocumentCheck,
} from 'react-icons/hi2';

function appLayout() {
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
				<li className={styles.icon}>
					<HiBars4 />
					Menu
				</li>
				<li className={styles.icon}>
					<HiOutlineUser />
					Perfil
				</li>
				<li className={styles.icon}>
					<HiOutlineUserGroup />
					Social
				</li>
				<li className={styles.icon}>
					<HiDocumentCheck />
					Atividades
				</li>
			</div>
		</body>
	);
}

export default appLayout;
