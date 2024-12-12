import app from './app';
import connect from './config/database';

const PORT = process.env.PORT || 3000;

async function startServer() {
	// await database.connectionDataBase();

	connect({ db });

	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
}

startServer();
