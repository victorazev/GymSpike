import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>GymSpike</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					Contador de clicks: {count}
				</button>
				<p>
					Edite o arquivo <code>front-end/src/App.tsx</code> e
					salve para testar
				</p>
			</div>
			<p className="read-the-docs">
				Clique no logo do react para ver mais
			</p>
		</>
	);
}

export default App;
