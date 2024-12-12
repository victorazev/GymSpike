import { UserListModel, UserListDocument } from '../models/user.model'; // Importa o modelo de usuário e o tipo do documento do Mongoose
import bcrypt from 'bcrypt'; // Importa o bcrypt para verificar senhas
import jwt from 'jsonwebtoken'; // Importa a biblioteca jsonwebtoken para criar tokens JWT

// Interface para os dados necessários para criar um usuário
interface CreateUserInput {
  email: string; // E-mail do usuário
  username: string; // Nome de usuário
  firstName: string; // Nome do usuário
  lastName: string; // Sobrenome do usuário
  phone: string; // Número de telefone
  gender: 'F' | 'M'; // Gênero do usuário (Feminino ou Masculino)
  password: string; // Senha do usuário
}

// Interface para os dados necessários para login de um usuário
interface LoginInput {
  email: string; // E-mail do usuário
  password: string; // Senha do usuário
}

// Função para criar um usuário no banco de dados
export const createUser = async (data: CreateUserInput): Promise<UserListDocument> => {
  const { email, username, firstName, lastName, phone, gender, password } = data;

  // Cria um novo documento de usuário, com a senha não hasheada ainda
  const newUser = new UserListModel({
    email,
    username,
    firstName,
    lastName,
    phone,
    gender,
    passwordHash: password, // A senha será automaticamente hasheada no middleware `pre` do modelo
  });

  // Salva o novo usuário no banco e retorna o documento
  return await newUser.save();
};

// Função para autenticar um usuário e gerar um token JWT
export const loginUser = async (data: LoginInput): Promise<{ token: string; user: object }> => {
  const { email, password } = data;

  // Busca o usuário no banco de dados pelo e-mail
  const user = await UserListModel.findOne({email});

  // Caso o usuário não seja encontrado, lança um erro
  if (!user){
    throw new Error('Invalid email or password');
  }

  // Verifica se a senha fornecida é válida, comparando com a senha hasheada no banco
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  // Caso a senha seja inválida, lança um erro
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Cria um token JWT com as informações do usuário, incluindo o id, e-mail e status de administrador
  const token = jwt.sign(
    { id: user.id, email: user.email, admin: user.admin},
    process.env.JWT_SECRET || 'default_secret', // Usa uma chave secreta para assinar o token
    { expiresIn: '1h'} // O token expira em 1 hora
  );

  // Retorna o token gerado e informações do usuário (sem a senha)
  return{
    token, 
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin
    },
  };
};

// Função para atualizar os dados de um usuário pelo ID
export const updateUserById = async (id: string, data: Partial<CreateUserInput>): Promise<UserListDocument | null> => {
  // Busca o usuário pelo ID
  const user = await UserListModel.findById(id);

  // Caso o usuário não seja encontrado, lança um erro
  if (!user) {
    throw new Error('User not found');
  }

  // Atualiza os campos do usuário com os dados fornecidos, ignorando os campos não enviados
  Object.assign(user, data);

  // Salva as alterações no banco de dados
  await user.save();
  
  // Retorna o usuário atualizado
  return user;
};

// Função para obter o perfil de um usuário pelo ID (apenas nome e sobrenome)
export const getUserProfileById = async (id: string): Promise<{ firstName: string; lastName: string } | null> => {
  // Busca o usuário pelo ID, selecionando apenas os campos 'firstName' e 'lastName'
  const user = await UserListModel.findById(id).select('firstName lastName');

  // Caso o usuário não seja encontrado, lança um erro
  if (!user) {
    throw new Error('User not found');
  }

  // Retorna o primeiro nome e sobrenome do usuário
  return {
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
