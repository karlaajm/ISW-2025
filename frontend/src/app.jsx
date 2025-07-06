"use strict";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@pages/Login.jsx";
import InicioPage from "@pages/Inicio.jsx";
import PrivateRoute from "@components/ProtectedRoute.jsx";
import LibrosPage from "@pages/Libros.jsx";

export default function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <LoginPage />
        } 
      />
      <Route
        path="/inicio"
        element={
          <PrivateRoute>
            <InicioPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/libros" 
        element={
          <PrivateRoute>
            <LibrosPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}