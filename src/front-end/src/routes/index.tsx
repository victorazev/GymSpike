import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppRoutes from './app.routes';
import { useAuth } from '../contexts/auth';

import Login from '../pages/Login/Login';
import { Cadastro } from '../pages/Cadastro/Cadastro';

const MainRoutes: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Router>
			<Routes>
				{isAuthenticated ? (
					<Route path="/*" element={<AppRoutes />} />
				) : (
					<>
						{/* Redirecionando para a página de login */}
						<Route path="/login" element={<Login />} />
						<Route path="/cadastro" element={<Cadastro />} />
						<Route path="/*" element={<Login />} />
					</>
				)}
			</Routes>

			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: '8px' }}
				toastOptions={{
					success: {
						duration: 5000,
					},
					error: {
						duration: 9000,
					},
					style: {
						fontSize: '16px',
						maxWidth: '500px',
						padding: '16px 24px',
						backgroundColor: '#0f0f0f',
						color: '#bbbbbb',
					},
				}}
			/>
		</Router>
	);
};

export default MainRoutes;
