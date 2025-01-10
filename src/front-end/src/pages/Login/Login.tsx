import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

import Button from "../../components/Button/Button";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
      navigate(0);
    } catch (error) {
      alert("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>GymSpike</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <Button onClick={() => navigate("/cadastro")}>Criar Conta</Button>
      </form>
    </div>
  );
};

export default Login;
