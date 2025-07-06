"use strict";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@pages/Login.jsx";
import InicioPage from "@pages/Inicio.jsx";
import PrivateRoute from "@components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/inicio"
        element={
          <PrivateRoute>
            <InicioPage />
          </PrivateRoute>
        }
      />
      {/* Aquí irán más rutas protegidas en el futuro */}
    </Routes>
  );
}