import { Request, Response, NextFunction } from 'express'; // Importa tipos do Express para as requisições, respostas e funções de middleware
import jwt from 'jsonwebtoken'; // Importa o pacote jwt para criar e verificar tokens JWT
import dotenv from 'dotenv';

dotenv.config();

// Interface personalizada para requisições autenticadas, estendendo a requisição padrão do Express
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;   // ID do usuário
    email: string; // Email do usuário
    admin: boolean; // Indica se o usuário é administrador
  };
}

// Função de middleware para autenticar o usuário com base no token JWT
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    // Obtém o token da autorização no cabeçalho da requisição (ex: "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];

    // Se o token não for fornecido, retorna erro 401 (Não autorizado)
    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    // Definir o segredo para verificar o token (pode ser obtido de variáveis de ambiente)
    const secret = process.env.JWT_SECRET || 'default_secret';

    // Verificar e decodificar o token, extraindo as informações do usuário
    const decoded = jwt.verify(token, secret) as { id: string; email: string; admin: boolean };

    // Adiciona as informações do usuário à requisição, para uso posterior nas rotas
    req.user = {
      id: decoded.id,
      email: decoded.email,
      admin: decoded.admin,
    };

    // Chama o próximo middleware ou rota
    next();
  } catch (error) {
    // Se o token for inválido ou ocorrer algum erro, retorna erro 403 (Proibido)
    res.status(403).json({ error: 'Invalid token.' });
  }
};
