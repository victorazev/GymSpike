import { Router } from 'express'; // Importa o Router do Express para definir as rotas
import { registerUser, getUserById, login, updateUser, getUserProfile } from '../controllers/user.controller'; // Importa as funções do controller de usuário
import { authenticate } from '../middlewares/auth.middleware'; // Importa o middleware de autenticação

const router = Router(); // Cria uma instância do router

// Rota para registrar um usuário (requisição POST)
router.post('/register', registerUser); 
// Rota para obter um usuário pelo ID (requisição GET). Exige autenticação.
router.get('/:id', authenticate, getUserById);
// Rota para realizar o login de um usuário (requisição POST)
router.post('/login', login);
// Rota para atualizar um usuário pelo ID (requisição PUT). Exige autenticação.
router.put('/:id', authenticate, updateUser);
// Rota para obter o perfil de um usuário pelo ID (requisição GET). Exige autenticação.
router.get('/profile/:id', authenticate, getUserProfile);

export default router; // Exporta o router para ser usado no arquivo principal da aplicação
