import express from 'express'; // Importa o Express, que é o framework usado para criar o servidor
import userRoutes from './routes/user.routes'; // Importa as rotas de usuário definidas em outro arquivo
import activityRoutes from './routes/activity.routes';
import activityGoalsRoutes from './routes/activityGoals.routes';
import feedBackRoutes from './routes/feedback.routes';

const app = express(); // Cria uma instância da aplicação Express

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Rota de teste (GET '/'): Verifica se o servidor está funcionando
app.get('/', (req, res) => {
	res.send('Servidor está funcionando!'); // Resposta simples para confirmar que o servidor está funcionando
});

// Usa as rotas de usuários a partir do caminho '/api/users'
app.use('/api/users', userRoutes);
app.use('/api/users', activityRoutes);
app.use('/api/users', activityGoalsRoutes);
app.use('/api/users', feedBackRoutes);

// Exporta a aplicação para ser usada em outro arquivo (por exemplo, para iniciar o servidor)
export default app;
