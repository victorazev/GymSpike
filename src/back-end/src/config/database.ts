import mongoose from 'mongoose';

// Defini o tipo de entrada esperada
type TInput = {
  db: string;
}
// Exporta a função que recebe o objeto 'db'
export default ({db}: TInput) => {
  
  //função para conectar ao banco de dados
  const connect = () => {
    mongoose
      .connect(
        db
      )
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  // Chama a função `connect()` para tentar se conectar ao banco de dados
  connect();


  // Adiciona um ouvinte para o evento `disconnected` da conexão do mongoose
  // Se a conexão for perdida, a função `connect()` será chamada novamente para tentar reconectar
  mongoose.connection.on('disconnected', connect);
};