import React from 'react';
import styles from './Loader.module.css';

const Spinner: React.FC = () => {
	return (
		<div className={styles.spinnerWrapper}>
			<div className={styles.spinner} />
		</div>
	);
};

export default Spinner;
