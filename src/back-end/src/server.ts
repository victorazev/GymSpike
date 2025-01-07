import app from './app'; // Importa a instância do aplicativo Express de um arquivo 'app.ts' ou 'app.js'
import connect from './config/database'; // Importa a função de conexão com o banco de dados de um arquivo de configuração 'database.ts' ou 'database.js'
import dotenv from 'dotenv'; // Importa o pacote dotenv para carregar variáveis de ambiente de um arquivo '.env'

dotenv.config(); // Carrega as variáveis de ambiente definidas no arquivo '.env'

// Define a porta do servidor. Se a variável de ambiente PORT não estiver definida, usa a porta 3000 por padrão.
const PORT = process.env.PORT || 3000;

// Função assíncrona para iniciar o servidor
async function startServer() {
  // Obtém a string de conexão do banco de dados a partir das variáveis de ambiente
  const db = process.env.STRING_CONNECTION || '';

  // Chama a função de conexão com o banco de dados, passando a string de conexão
  connect({ db });

  // Inicia o servidor Express na porta definida e exibe uma mensagem no console quando o servidor estiver ativo
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Exibe no console o número da porta que o servidor está escutando
  });
}

// Chama a função 'startServer' para iniciar o servidor
startServer();
