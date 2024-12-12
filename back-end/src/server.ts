import app from './app';
import connect from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
	const db = process.env.STRING_CONNECTION || '';

	connect({ db });

	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
}

startServer();
