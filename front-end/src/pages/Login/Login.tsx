import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* <img src="path-to-logo.png" alt="GymSpike Logo" className={styles.logo} /> */}
      <h2>GymSpike</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Login" />
        <input type="password" placeholder="Senha" />
        <Button onClick={() => navigate("/")}>Entrar</Button>
        <Button onClick={() => navigate("/cadastro")}>Criar Conta</Button>
      </form>
    </div>
  );
};

export default Login;
