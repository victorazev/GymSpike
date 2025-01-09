import axios from "axios";

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

interface SignInResponse {
  token: string;
  user: User;
}

// Função de login que faz a requisição ao servidor
export async function signIn(email: string, password: string): Promise<SignInResponse> {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    // Retorna o token e o usuário
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Falha na autenticação. Verifique suas credenciais.");
  }
}
