import { AuthProvider } from "./contexts/auth"; // Contexto de autenticação
import MainRoutes from "./routes/index"; // Rotas separadas

function App() {
  return (
    <AuthProvider>
        <MainRoutes />
    </AuthProvider>
  );
}

export default App;
