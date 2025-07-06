"use strict";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = document.cookie.includes("jwt-auth"); // O usa tu contexto si tienes uno
  return token ? children : <Navigate to="/" />;
}