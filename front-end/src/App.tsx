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
import {User, Userconfig} from './pages/User/User';
import {Social, Groups} from './pages/Social/Social';
import Activities from './pages/Activities/Activities';


function App() {
	return (
		<Router>
			<Routes>
				{/* Rotas com layout */}
				<Route element={<AppLayout />}>
					<Route index element={<Navigate replace to="dashboard" />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="user" element={<User />} />
					<Route path="userconfig" element={<Userconfig />} />
					<Route path="social" element={<Social />} />
					<Route path="groups" element={<Groups />} />
					<Route path="activities" element={<Activities />} />
				</Route>
				
				{/* Rotas sem layout */}
				<Route path="login" element={<Login />} />
				<Route path="cadastro" element={<Cadastro />} />
				<Route path="cadastro2" element={<Cadastro2 />} />
			</Routes>
		</Router>
	);
}

export default App;
