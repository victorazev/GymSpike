import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import { Cadastro, Cadastro2 } from './pages/Cadastro/Cadastro';
import AppLayout from './pages/AppLayout/AppLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import UserActivity from './pages/UserActivity/UserActivity';

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AppLayout />}>
					<Route
						index
						element={<Navigate replace to="dashboard" />}
					/>
					<Route path="dashboard" element={<Dashboard />} />
					<Route
						path="userActivity"
						element={<UserActivity />}
					/>
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="cadastro" element={<Cadastro />} />
				<Route path="cadastro2" element={<Cadastro2 />} />
			</Routes>
		</Router>
	);
}

export default App;
