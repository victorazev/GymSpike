import React from "react";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import { Cadastro } from "../pages/Cadastro/Cadastro";

const MainRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated2:", isAuthenticated);

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<AppRoutes />} />
        ) : (
          <>
            {/* Redirecionando para a página de login */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default MainRoutes;
