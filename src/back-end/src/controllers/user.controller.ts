import { Request, Response } from 'express'; // Importa tipos para as requisições e respostas HTTP
import { createUser } from '../services/user.service'; // Importa a função de criar usuário do serviço
import { UserListModel } from '../models/user.model'; // Importa o modelo de usuário do Mongoose
import { loginUser, updateUserById, getUserProfileById } from '../services/user.service'; // Importa as funções do serviço relacionadas ao login, atualização e perfil

// Função para registrar um usuário
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Chama o serviço de criação de usuário com os dados enviados no corpo da requisição
    const user = await createUser(req.body);
    // Retorna uma resposta com sucesso e o usuário criado
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro genérica
    res.status(400).json({ error: 'An unknown error occurred' });
  }
};

// Função para buscar um usuário pelo ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extrai o ID do usuário dos parâmetros da requisição

    // Busca o usuário pelo ID no banco de dados, excluindo a senha
    const user = await UserListModel.findById(id).select('-passwordHash');

    if (!user) {
      // Se o usuário não for encontrado, retorna erro 404
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // Retorna o usuário encontrado
    res.status(200).json(user);
  } catch (error) {
    // Em caso de erro, retorna o erro com status 500
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Função para realizar o login de um usuário
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password} = req.body; // Extrai e-mail e senha do corpo da requisição

    // Valida se o e-mail e a senha foram fornecidos
    if (!email || !password){
      res.status(400).json({ error:'Email and password are required!'});
      return;
    }

    // Chama o serviço de login com os dados fornecidos
    const result = await loginUser({email, password});
    // Retorna o resultado do login (token e informações do usuário)
    res.status(200).json(result);
  } catch (error) {
    // Em caso de erro, retorna erro com status 401 para falha de autenticação ou 500 para erro desconhecido
    if (error instanceof Error) {
      res.status(401).json({ error: 'Request failed'});
    } else {
      res.status(500).json({ error: 'An unknown error occurred'});
    }
  }
};

// Função para atualizar os dados de um usuário pelo ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extrai o ID do usuário dos parâmetros da requisição
    const userData = req.body; // Extrai os dados do usuário do corpo da requisição

    // Chama a função de atualização do serviço
    const updatedUser = await updateUserById(id, userData);

    if (!updatedUser) {
      // Se o usuário não for encontrado, retorna erro 404
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Retorna o usuário atualizado (sem a senha) e uma mensagem de sucesso
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        admin: updatedUser.admin,
      },
    });
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro com status 500
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Função para obter o perfil de um usuário pelo ID
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID do usuário que você quer exibir o perfil

    // Chama o serviço para obter os dados do perfil do usuário
    const userProfile = await getUserProfileById(id);

    // Se o perfil do usuário não for encontrado, retorna erro 404
    if (!userProfile) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Retorna as informações do perfil (nome e sobrenome) com uma mensagem de sucesso
    res.status(200).json({
      message: 'User profile retrieved successfully',
      profile: userProfile,
    });
  } catch (error) {
    // Em caso de erro, retorna o erro com status 500
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
