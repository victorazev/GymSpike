import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Cadastro.module.css";

export const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Cadastro</h2>
      <form className={styles.form}>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmar Senha" />
        <Button onClick={() => navigate("/cadastro2")}>Próximo</Button>
      </form>
    </div>
  );
};

export const Cadastro2 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Cadastro</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Apelido" />
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Sobrenome" />
        <input type="tel" placeholder="Telefone" />
        <Button onClick={() => navigate("/")}>Cadastrar</Button>
      </form>
    </div>
  );
};
