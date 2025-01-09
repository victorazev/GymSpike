import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { signIn as signInService } from "../services/auth";

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;

}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

// Funções auxiliares para manipulação do localStorage
const getToken = () => localStorage.getItem("authToken");
const setToken = (token: string) => localStorage.setItem("authToken", token);
const removeToken = () => localStorage.removeItem("authToken");

const getUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};
const setUserStorage = (user: User) => localStorage.setItem("user", JSON.stringify(user));
const removeUserStorage = () => localStorage.removeItem("user");

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setUser(storedUser);
      // Opcional: Verificar a validade do token no backend
      // validateToken(token).catch(() => signOut());
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user, token } = await signInService(email, password);
      setUser(user);
      setToken(token);
      setUserStorage(user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha na autenticação. Verifique suas credenciais.");
    }
  };

  const signOut = () => {
    setUser(null);
    removeToken();
    removeUserStorage();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
